using server.Core.Entities.LoanSlip;
using server.Core.Models.Book;

namespace server.Core.Dtos.BorrowedDetail
{
    public class BorrowedDetailCreateDto
    {
        public string id { get; set; }
        public string? name { get; set; }
        public string book_id { get; set; }
        public string? borrowed_day { get; set; }
        public string? pay_day { get; set; }
        public string? note { get; set; }
    }
}
