using server.Core.Models.Author;
using server.Core.Models.Category;
using server.Core.Models.PublishingCompany;
using server.Core.Models.Reader;

namespace server.Core.Dtos.Book
{
    public class BookCreatedDto
    {
        public string? name { get; set; }
        public string? type_id { get; set; }
        public string? author_id { get; set; }
        public string? publishing_id { get; set; }
    }
}
