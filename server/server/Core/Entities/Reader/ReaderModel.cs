using server.Core.Entities.LibraryCard;
using server.Core.Models.Book;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Models.Reader
{
    public class ReaderModel
    {
        [Key]
        public string id { get; set; }
        public string? name { get; set; }
        public string? address { get; set; }
        public string library_card_id { get; set; }
        public LibraryCardModel library_card { get; set; }
    }
}
