using server.Core.Models.Book;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Models.PublishingCompany
{
    public class PublishingCompanyModel
    {
        [Key]
        public string id { get; set; }
        public string? name { get; set; }
        public string? address { get; set; }
        public string? email { get; set; }
        public ICollection<BookModel> Book { get; set; }
    }
}
