using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Core.Dtos.PublishingCompany;
using server.Core.Dtos.TypeBook;
using server.Core.Models.Category;
using server.Core.Models.PublishingCompany;
using server.Data;
using System.Data;
using System.Data.SqlClient;

namespace server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PublishingCompanyController : ControllerBase
    {
        private LibraryContext _context { get; }
        public PublishingCompanyController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetPublishingCompany()
        {
            var publishingCompany = await _context.PublishingCompany.ToListAsync();
            return Ok(publishingCompany);
        }
        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<PublishingCompanyModel>> GetByIdPublishingCompany([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var publishingCompany = await _context.PublishingCompany.FindAsync(id);

            if (publishingCompany == null)
            {
                return NotFound();
            }

            return Ok(publishingCompany);
        }
        [HttpPost]
        public async Task<ActionResult> AddPublishingCompany([FromBody] PublishingCompanyCreatedDto newPublishingCompany)
        {
            PublishingCompanyModel publishingCompany = new PublishingCompanyModel
            {
                id = GenerateId(),
                name = newPublishingCompany.name,
                address = newPublishingCompany.address,
                email = newPublishingCompany.email,
            };
            await _context.PublishingCompany.AddAsync(publishingCompany);
            await _context.SaveChangesAsync();
            return Ok("Add success");
        }
        private string GenerateId()
        {
            int counter = 1;
            while (true)
            {
                string generatedId = $"PUC{counter++:D2}";

                if (!_context.PublishingCompany.Any(d => d.id == generatedId))
                {
                    return generatedId;
                }
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdatePublishingCompany([FromQuery] string id, [FromBody] PublishingCompanyCreatedDto updatePublishingCompany)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: Id");
            }

            var existingPublishingCompany = await _context.PublishingCompany.FindAsync(id);

            if (existingPublishingCompany == null)
            {
                return NotFound();
            }

            existingPublishingCompany.name = updatePublishingCompany.name;
            existingPublishingCompany.address = updatePublishingCompany.address;
            existingPublishingCompany.email = updatePublishingCompany.email;
            await _context.SaveChangesAsync();

            return Ok("Update success");
        }
        [HttpDelete]
        public async Task<ActionResult> DeletePublishingCompany([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Missing required parameter: id");
            }

            var publishingCompany = await _context.PublishingCompany.FindAsync(id);

            if (publishingCompany == null)
            {
                return NotFound();
            }
            _context.PublishingCompany.Remove(publishingCompany);
            await _context.SaveChangesAsync();

            return Ok("Delete success");
        }
    }
}
