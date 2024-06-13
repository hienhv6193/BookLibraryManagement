using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    }
}
