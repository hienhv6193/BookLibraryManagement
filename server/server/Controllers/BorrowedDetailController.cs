using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.BorrowedDetail;
using server.Core.Dtos.Reader;
using server.Core.Entities.BorrowedDetail;
using server.Core.Models.Reader;
using server.Data;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BorrowedDetailController : ControllerBase
    {
        private LibraryContext _context { get; }
        public BorrowedDetailController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetBorrowedDetail()
        {
            var borrowedDetail = await _context.BorrowDetail.ToListAsync();
            return Ok(borrowedDetail);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<BorrowedDetailModel>> GetByIdBorrowedDetail([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var borrowedDetail = await _context.BorrowDetail.FindAsync(id);

            if (borrowedDetail == null)
            {
                return NotFound();
            }

            return Ok(borrowedDetail);
        }
        [HttpPost]
        public async Task<ActionResult> AddBorrowedDetail([FromBody] BorrowedDetailCreateDto newBorrowedDetail)
        {
            BorrowedDetailModel borrowedDetail = new BorrowedDetailModel
            {
                id = newBorrowedDetail.id,
                name = newBorrowedDetail.name,
                book_id = newBorrowedDetail.book_id,
                borrowed_day = newBorrowedDetail.borrowed_day,
                pay_day = newBorrowedDetail.pay_day,
                note = newBorrowedDetail.note,
            };
            await _context.BorrowDetail.AddAsync(borrowedDetail);
            await _context.SaveChangesAsync();
            return Ok("Add success");

        }
        [HttpPut]
        public async Task<ActionResult> UpdateBorrowedDetail([FromBody] BorrowedDetailCreateDto updateBorrowedDetail)
        {
            var existingBorrowedDetail = await _context.BorrowDetail.FindAsync(updateBorrowedDetail.id);

            if (existingBorrowedDetail == null)
            {
                return NotFound();
            }

            existingBorrowedDetail.id = updateBorrowedDetail.id;
            existingBorrowedDetail.name = updateBorrowedDetail.name;
            existingBorrowedDetail.book_id = updateBorrowedDetail.book_id;
            existingBorrowedDetail.borrowed_day = updateBorrowedDetail.borrowed_day;
            existingBorrowedDetail.pay_day = updateBorrowedDetail.pay_day;
            existingBorrowedDetail.note = updateBorrowedDetail.note;
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteBorrowedDetail([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var borrowedDetail = await _context.BorrowDetail.FindAsync(id);

            if (borrowedDetail == null)
            {
                return NotFound();
            }
            _context.BorrowDetail.Remove(borrowedDetail);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
