using server.Core.Entities.LoanSlip;
using server.Core.Models.Reader;
using System.ComponentModel.DataAnnotations;

namespace server.Core.Entities.LibraryCard
{
    public class LibraryCardModel
    {
        [Key]
        public string id { get; set; }
        public string card_created_date { get; set; }
        public string card_expiry_date { get; set; }
        public string note { get; set; }
        public ICollection<ReaderModel> reader { get; set; }
        public ICollection<LoanSlipModel> loanSlip { get; set; }
    }
}
