using server.Core.Entities.LoanSlip;
using server.Core.Models.Book;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Entities.BorrowedDetail
{
    public class BorrowedDetailModel
    {
        [Key]
        public string id { get; set; }
        public LoanSlipModel loanSlip { get; set; }
        public string? name { get; set; }
        public string book_id { get; set; }
        public BookModel book { get; set; }
        public string? borrowed_day { get; set; }
        public string? pay_day { get; set; }
        public string? note { get; set; }
    }
}
