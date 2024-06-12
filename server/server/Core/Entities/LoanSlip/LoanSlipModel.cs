using server.Core.Entities.BorrowedDetail;
using server.Core.Entities.LibraryCard;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Entities.LoanSlip
{
    public class LoanSlipModel
    {
        [Key]
        public string id { get; set; }
        public string library_card_id { get; set; }
        public LibraryCardModel  library_card { get; set; }
        public ICollection<BorrowedDetailModel> borrowed_detail { get; set; }
    }
}
