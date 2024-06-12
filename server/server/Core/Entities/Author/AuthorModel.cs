using server.Core.Models.Book;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Models.Author
{
    public class AuthorModel
    {
        [Key]
        public string id { get; set; }
        public string? name { get; set; }
        public string? website { get; set; }
        public string? note { get; set; }

        public ICollection<BookModel> Book { get; set; }
    }
}
