using Microsoft.EntityFrameworkCore;
using server.Core.Entities.BorrowedDetail;
using server.Core.Entities.LibraryCard;
using server.Core.Entities.LoanSlip;
using server.Core.Models.Author;
using server.Core.Models.Book;
using server.Core.Models.Category;
using server.Core.Models.PublishingCompany;
using server.Core.Models.Reader;

namespace server.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }
        public DbSet<ReaderModel> Reader {  get; set; }
        public DbSet<LibraryCardModel> LibraryCard { get; set; }
        public DbSet<LoanSlipModel> LoanSlip { get; set; }
        public DbSet<BorrowedDetailModel> BorrowDetail { get; set; }
        public DbSet<BookModel> Book { get; set; }
        public DbSet<AuthorModel> Author { get; set; }
        public DbSet<TypeBookModel> TypeBook { get; set; }
        public DbSet<PublishingCompanyModel> PublishingCompany { get; set; }
        protected override void OnModelCreating(ModelBuilder optionsBuilder)
        {
            base.OnModelCreating(optionsBuilder);
            optionsBuilder.Entity<ReaderModel>()
                .HasOne(reader => reader.library_card)
                .WithMany(library_card => library_card.reader)
                .HasForeignKey(reader => reader.library_card_id);
            optionsBuilder.Entity<LoanSlipModel>()
                .HasOne(loan_slip => loan_slip.library_card)
                .WithMany(library_card => library_card.loanSlip)
                .HasForeignKey(loan_slip => loan_slip.library_card_id);
            optionsBuilder.Entity<BorrowedDetailModel>()
                .HasOne(borrowed_detail => borrowed_detail.loanSlip)
                .WithMany(loan_slip => loan_slip.borrowed_detail)
                .HasForeignKey(borrowed_detail => borrowed_detail.id);
            optionsBuilder.Entity<BorrowedDetailModel>()
                .HasOne(borrowed_detail => borrowed_detail.book)
                .WithMany(book => book.borrowedDetail)
                .HasForeignKey(borrowed_detail => borrowed_detail.book_id);
            optionsBuilder.Entity<BookModel>()
                .HasOne(book => book.author)
                .WithMany(author => author.Book)
                .HasForeignKey(book => book.author_id);
            optionsBuilder.Entity<BookModel>()
                .HasOne(book => book.typeBook)
                .WithMany(typeBook => typeBook.Book)
                .HasForeignKey(book => book.type_id);
            optionsBuilder.Entity<BookModel>()
                .HasOne(book => book.publishingCompany)
                .WithMany(publishingCompany => publishingCompany.Book)
                .HasForeignKey(book => book.publishing_id);
        }
    }
}
