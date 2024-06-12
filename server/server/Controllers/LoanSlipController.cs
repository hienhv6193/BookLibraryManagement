using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.LoanSlip;
using server.Core.Dtos.TypeBook;
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
        public async Task<ActionResult> AddLoanSlip([FromBody] LoanSlipCreatedDto newLoanSlip)
        {
            LoanSlipModel loanSlip = new LoanSlipModel
            {
                id = GenerateId(),
                library_card_id = newLoanSlip.library_card_id,
            };
            await _context.LoanSlip.AddAsync(loanSlip);
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

            var existingLoanSlip = await _context.LoanSlip.FindAsync(id);

            if (existingLoanSlip == null)
            {
                return NotFound();
            }

            existingLoanSlip.library_card_id = updateLoanSlip.library_card_id;
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

            var loanSlip = await _context.LoanSlip.FindAsync(id);

            if (loanSlip == null)
            {
                return NotFound();
            }
            _context.LoanSlip.Remove(loanSlip);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
