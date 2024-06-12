using server.Core.Models.Author;
using server.Core.Models.Category;
using server.Core.Models.PublishingCompany;
using server.Core.Models.Reader;

namespace server.Core.Dtos.Book
{
    public class BookGetDto
    {
        public string id { get; set; }
        public string name { get; set; }
        public string typeBookName { get; set; }
        public string authorName { get; set; }
        public string publishingCompanyName { get; set; }
    }
}
