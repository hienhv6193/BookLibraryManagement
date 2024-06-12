using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.Author;
using server.Core.Dtos.Reader;
using server.Core.Models.Author;
using server.Core.Models.Category;
using server.Core.Models.Reader;
using server.Data;
using System.Data;
using System.Data.SqlClient;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
    {
        private LibraryContext _context { get; }
        public ReaderController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetReader()
        {
            var reader = await _context.Reader.ToListAsync();
            return Ok(reader);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<ReaderModel>> GetByIdReader([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var reader = await _context.Reader.FindAsync(id);

            if (reader == null)
            {
                return NotFound();
            }

            return Ok(reader);
        }
        [HttpPost]
        public async Task<ActionResult> AddReader([FromBody] ReaderCreatedDto newReader)
        {
            ReaderModel reader = new ReaderModel
            {
                id = GenerateId(),
                name = newReader.name,
                address = newReader.address,
                library_card_id = newReader.library_card_id,
            };
            await _context.Reader.AddAsync(reader);
            await _context.SaveChangesAsync();
            return Ok("Add success");

        }
        private string GenerateId()
        {
            int counter = 1;
            while (true)
            {
                string generatedId = $"RE{counter++:D2}";

                if (!_context.Reader.Any(d => d.id == generatedId))
                {
                    return generatedId;
                }
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdateReader([FromQuery] string id, [FromBody] ReaderCreatedDto updateReader)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: Id");
            }

            var existingReader = await _context.Reader.FindAsync(id);

            if (existingReader == null)
            {
                return NotFound();
            }

            existingReader.name = updateReader.name;
            existingReader.address = updateReader.address;
            existingReader.library_card_id = updateReader.library_card_id;
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteReader([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var reader = await _context.Reader.FindAsync(id);

            if (reader == null)
            {
                return NotFound();
            }
            _context.Reader.Remove(reader);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
