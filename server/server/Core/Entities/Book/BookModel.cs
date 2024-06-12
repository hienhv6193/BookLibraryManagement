using server.Core.Entities.BorrowedDetail;
using server.Core.Models.Author;
using server.Core.Models.Category;
using server.Core.Models.PublishingCompany;
using server.Core.Models.Reader;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Models.Book
{
    public class BookModel
    {
        [Key]
        public string id { get; set; }
        public string? name { get; set; }
        public string? type_id { get; set; }
        public TypeBookModel typeBook { get; set; }
        public string? author_id { get; set; }
        public AuthorModel author { get; set; }
        public string? publishing_id { get; set; }
        public PublishingCompanyModel publishingCompany { get; set; }
        public ICollection<BorrowedDetailModel> borrowedDetail { get; set; }
    }
}
