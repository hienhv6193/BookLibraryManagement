using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.LoanSlip;
using server.Core.Dtos.TypeBook;
using server.Core.Entities.BorrowedDetail;
using server.Core.Entities.LoanSlip;
using server.Core.Models.Category;
using server.Data;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LoanSlipController : ControllerBase
    {
        private LibraryContext _context { get; }
        public LoanSlipController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetLoanSlip()
        {
            var loanSlip = await _context.LoanSlip.ToListAsync();
            return Ok(loanSlip);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<LoanSlipModel>> GetByIdLoanSlip([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var loanSlip = await _context.LoanSlip.FindAsync(id);

            if (loanSlip == null)
            {
                return NotFound();
            }

            return Ok(loanSlip);
        }
        [HttpPost]
        public async Task<ActionResult> AddLoanSlipWithBorrowedDetail([FromBody] LoanSlipCreatedDto newLoanSlip)
        {
            if (string.IsNullOrEmpty(newLoanSlip.borrowed_day) || string.IsNullOrEmpty(newLoanSlip.pay_day))
            {
                return BadRequest("Ngày mượn hoặc ngày trả không được để trống");
            }
            if (!DateTime.TryParse(newLoanSlip.borrowed_day, out DateTime borrowedDay) ||
                !DateTime.TryParse(newLoanSlip.pay_day, out DateTime payDay))
            {
                return BadRequest("Ngày mượn hoặc ngày trả không hợp lệ");
            }

            if (borrowedDay > payDay)
            {
                return BadRequest("Ngày mượn không thể sau ngày trả");
            }
            LoanSlipModel loanSlip = new LoanSlipModel
            {
                id = GenerateId(),
                library_card_id = newLoanSlip.library_card_id,
            };
            BorrowedDetailModel borrowedDetail = new BorrowedDetailModel
            {
                id = loanSlip.id,
                name = newLoanSlip.name,
                book_id = newLoanSlip.book_id,
                borrowed_day = newLoanSlip.borrowed_day,
                pay_day = newLoanSlip.pay_day,
                note = newLoanSlip.note,
            };
            await _context.LoanSlip.AddAsync(loanSlip);
            await _context.BorrowDetail.AddAsync(borrowedDetail);
            await _context.SaveChangesAsync();
            return Ok("Add success");
        }
        private string GenerateId()
        {
            int counter = 1;
            while (true)
            {
                string generatedId = $"LOS{counter++:D2}";

                if (!_context.LoanSlip.Any(d => d.id == generatedId))
                {
                    return generatedId;
                }
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdateLoanSlip([FromQuery] string id, [FromBody] LoanSlipCreatedDto updateLoanSlip)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: Id");
            }
            if (string.IsNullOrEmpty(updateLoanSlip.borrowed_day) || string.IsNullOrEmpty(updateLoanSlip.pay_day))
            {
                return BadRequest("Ngày mượn hoặc ngày trả không được để trống");
            }
            if (!DateTime.TryParse(updateLoanSlip.borrowed_day, out DateTime borrowedDay) ||
                !DateTime.TryParse(updateLoanSlip.pay_day, out DateTime payDay))
            {
                return BadRequest("Ngày mượn hoặc ngày trả không hợp lệ");
            }

            if (borrowedDay > payDay)
            {
                return BadRequest("Ngày mượn không thể sau ngày trả");
            }

            var existingLoanSlip = await _context.LoanSlip.Include(ls => ls.borrowed_detail).FirstOrDefaultAsync(ls => ls.id == id);

            if (existingLoanSlip == null)
            {
                return NotFound();
            }

            existingLoanSlip.library_card_id = updateLoanSlip.library_card_id;
            if (existingLoanSlip.borrowed_detail != null)
            {
                var borrowedDetail = existingLoanSlip.borrowed_detail.First();
                borrowedDetail.name = updateLoanSlip.name;
                borrowedDetail.book_id = updateLoanSlip.book_id;
                borrowedDetail.borrowed_day = updateLoanSlip.borrowed_day;
                borrowedDetail.pay_day = updateLoanSlip.pay_day;
                borrowedDetail.note = updateLoanSlip.note;
            }
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteLoanSlip([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var loanSlip = await _context.LoanSlip.Include(ls => ls.borrowed_detail).FirstOrDefaultAsync(ls => ls.id == id);

            if (loanSlip == null)
            {
                return NotFound();
            }
            _context.LoanSlip.Remove(loanSlip);
            _context.BorrowDetail.RemoveRange(loanSlip.borrowed_detail);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
