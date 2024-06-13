namespace server.Core.Dtos.LoanSlip
{
    public class LoanSlipCreatedDto
    {
        public string library_card_id { get; set; }
        public string? name { get; set; }
        public string book_id { get; set; }
        public string? borrowed_day { get; set; }
        public string? pay_day { get; set; }
        public string? note { get; set; }
    }
}
