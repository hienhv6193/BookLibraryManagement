using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.TypeBook;
using server.Core.Models.Category;
using server.Data;
using System.Data;
using System.Data.SqlClient;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TypeBookController : ControllerBase
    {
        private LibraryContext _context { get; }
        public TypeBookController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetTypeBook()
        {
            var typeBook = await _context.TypeBook.ToListAsync();
            return Ok(typeBook);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<TypeBookModel>> GetByIdTypeBook([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var typeBook = await _context.TypeBook.FindAsync(id);

            if (typeBook == null)
            {
                return NotFound();
            }

            return Ok(typeBook);
        }
        [HttpPost]
        public async Task<ActionResult> AddTypeBook([FromBody] TypeBookCreatedDto newTypeBook)
        {
            TypeBookModel typeBook = new TypeBookModel
            {
                id = GenerateId(),
                name = newTypeBook.name,
            };
            await _context.TypeBook.AddAsync(typeBook);
            await _context.SaveChangesAsync();
            return Ok("Add success");
        }
        private string GenerateId()
        {
            int counter = 1;
            while (true)
            {
                string generatedId = $"TYB{counter++:D2}";

                if (!_context.TypeBook.Any(d => d.id == generatedId))
                {
                    return generatedId;
                }
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdateTypeBook([FromQuery] string id, [FromBody] TypeBookCreatedDto updateTypeBook)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: Id");
            }

            var existingTypeBook = await _context.TypeBook.FindAsync(id);

            if (existingTypeBook == null)
            {
                return NotFound();
            }

            existingTypeBook.name = updateTypeBook.name;
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteTypeBook([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var typeBook = await _context.TypeBook.FindAsync(id);

            if (typeBook == null)
            {
                return NotFound();
            }
            _context.TypeBook.Remove(typeBook);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
