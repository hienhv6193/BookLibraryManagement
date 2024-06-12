using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.Author;
using server.Core.Dtos.Book;
using server.Core.Models.Author;
using server.Core.Models.Book;
using server.Core.Models.Category;
using server.Data;
using System.Data;
using System.Data.SqlClient;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private LibraryContext _context { get; }
        private IMapper _mapper { get; }
        public BookController(LibraryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult> GetBook()
        {
            var book = await _context.Book.ToListAsync();
            return Ok(book);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<BookModel>> GetByIdBook([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }
        [HttpPost]
        public async Task<ActionResult> AddBook([FromBody] BookCreatedDto newBook)
        {
            BookModel book = new BookModel
            {
                id = GenerateId(),
                name = newBook.name,
                type_id = newBook.type_id,
                author_id = newBook.author_id,
                publishing_id = newBook.publishing_id,
            };
            await _context.Book.AddAsync(book);
            await _context.SaveChangesAsync();
            return Ok("Add success");
        }
        private string GenerateId()
        {
            int counter = 1;
            while (true)
            {
                string generatedId = $"BO{counter++:D2}";

                if (!_context.Book.Any(d => d.id == generatedId))
                {
                    return generatedId;
                }
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdateBook([FromQuery] string id, [FromBody] BookCreatedDto updateBook)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: Id");
            }

            var existingBook = await _context.Book.FindAsync(id);

            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.name = updateBook.name;
            existingBook.type_id = updateBook.type_id;
            existingBook.author_id = updateBook.author_id;
            existingBook.publishing_id = updateBook.publishing_id;
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteBook([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }
            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
