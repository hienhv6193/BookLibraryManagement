using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.LibraryCard;
using server.Core.Entities.LibraryCard;
using server.Data;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LibraryCardController : ControllerBase
    {
        private LibraryContext _context { get; }
        public LibraryCardController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetLibraryCard()
        {
            var libraryCard = await _context.LibraryCard.ToListAsync();
            return Ok(libraryCard);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<LibraryCardModel>> GetByIdLibraryCard([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var libraryCard = await _context.LibraryCard.FindAsync(id);

            if (libraryCard == null)
            {
                return NotFound();
            }

            return Ok(libraryCard);
        }
        [HttpPost]
        public async Task<ActionResult> AddLibraryCard([FromBody] LibraryCardCreatedDto newLibraryCard)
        {
            LibraryCardModel libraryCard = new LibraryCardModel
            {
                id = GenerateId(),
                card_created_date = newLibraryCard.card_created_date,
                card_expiry_date = newLibraryCard.card_expiry_date,
                note = newLibraryCard.note,
            };
            await _context.LibraryCard.AddAsync(libraryCard);
            await _context.SaveChangesAsync();
            return Ok("Add success");

        }
        private string GenerateId()
        {
            int counter = 1;
            while (true)
            {
                string generatedId = $"LBC{counter++:D2}";

                if (!_context.LibraryCard.Any(d => d.id == generatedId))
                {
                    return generatedId;
                }
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdateLibraryCard([FromQuery] string id, [FromBody] LibraryCardCreatedDto updateLibraryCard)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: Id");
            }

            var existingLibraryCard = await _context.LibraryCard.FindAsync(id);

            if (existingLibraryCard == null)
            {
                return NotFound();
            }

            existingLibraryCard.card_created_date = updateLibraryCard.card_created_date;
            existingLibraryCard.card_expiry_date = updateLibraryCard.card_expiry_date;
            existingLibraryCard.note = updateLibraryCard.note;
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteLibraryCard([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var libraryCard = await _context.LibraryCard.FindAsync(id);

            if (libraryCard == null)
            {
                return NotFound();
            }
            _context.LibraryCard.Remove(libraryCard);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
