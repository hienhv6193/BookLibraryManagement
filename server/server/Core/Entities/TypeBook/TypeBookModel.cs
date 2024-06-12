using server.Core.Models.Book;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Models.Category
{
    public class TypeBookModel
    {
        [Key]
        public string id { get; set; }
        public string? name { get; set; }
        public ICollection<BookModel> Book { get; set; }
    }
}
