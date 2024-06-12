using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.Author;
using server.Core.Models.Author;
using server.Data;
using System.Data.SqlClient;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private LibraryContext _context { get; }
        public AuthorController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetAuthor()
        {
            var author = await _context.Author.ToListAsync();
            return Ok(author);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<AuthorModel>> GetByIdAuthor([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var author = await _context.Author.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }
        [HttpPost]
        public async Task<ActionResult> AddAuthor([FromBody] AuthorCreatedDto newAuthor)
        {
                AuthorModel author = new AuthorModel
                {
                    id = GenerateId(),
                    name = newAuthor.name,
                    website = newAuthor.website,
                    note = newAuthor.note,
                };
                await _context.Author.AddAsync(author);
                await _context.SaveChangesAsync();
                return Ok("Add success");
            
        }
        private string GenerateId()
        {
            int counter = 1;
            while (true)
            {
                string generatedId = $"AU{counter++:D2}";

                if (!_context.Author.Any(d => d.id == generatedId))
                {
                    return generatedId;
                }
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdateAuthor([FromQuery] string id, [FromBody] AuthorCreatedDto updateAuthor)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: Id");
            }

            var existingAuthor = await _context.Author.FindAsync(id);

            if (existingAuthor == null)
            {
                return NotFound();
            }

            existingAuthor.name = updateAuthor.name;
            existingAuthor.website = updateAuthor.website;
            existingAuthor.note = updateAuthor.note;
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteAuthor([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var author = await _context.Author.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }
            _context.Author.Remove(author);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
