﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(LibraryContext))]
    [Migration("20240611060352_initial-migration")]
    partial class initialmigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("server.Core.Entities.BorrowedDetail.BorrowedDetailModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("book_id")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("borrowed_day")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("pay_day")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("book_id");

                    b.ToTable("BorrowDetail");
                });

            modelBuilder.Entity("server.Core.Entities.LibraryCard.LibraryCardModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("card_created_date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("card_expiry_date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("LibraryCard");
                });

            modelBuilder.Entity("server.Core.Entities.LoanSlip.LoanSlipModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("library_card_id")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("id");

                    b.HasIndex("library_card_id");

                    b.ToTable("LoanSlip");
                });

            modelBuilder.Entity("server.Core.Models.Author.AuthorModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("website")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Author");
                });

            modelBuilder.Entity("server.Core.Models.Book.BookModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("author_id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("publishing_id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("type_id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("id");

                    b.HasIndex("author_id");

                    b.HasIndex("publishing_id");

                    b.HasIndex("type_id");

                    b.ToTable("Book");
                });

            modelBuilder.Entity("server.Core.Models.Category.TypeBookModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("TypeBook");
                });

            modelBuilder.Entity("server.Core.Models.PublishingCompany.PublishingCompanyModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("PublishingCompany");
                });

            modelBuilder.Entity("server.Core.Models.Reader.ReaderModel", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("library_card_id")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("library_card_id");

                    b.ToTable("Reader");
                });

            modelBuilder.Entity("server.Core.Entities.BorrowedDetail.BorrowedDetailModel", b =>
                {
                    b.HasOne("server.Core.Models.Book.BookModel", "book")
                        .WithMany("borrowedDetail")
                        .HasForeignKey("book_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Core.Entities.LoanSlip.LoanSlipModel", "loanSlip")
                        .WithMany("borrowed_detail")
                        .HasForeignKey("id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("book");

                    b.Navigation("loanSlip");
                });

            modelBuilder.Entity("server.Core.Entities.LoanSlip.LoanSlipModel", b =>
                {
                    b.HasOne("server.Core.Entities.LibraryCard.LibraryCardModel", "library_card")
                        .WithMany("loanSlip")
                        .HasForeignKey("library_card_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("library_card");
                });

            modelBuilder.Entity("server.Core.Models.Book.BookModel", b =>
                {
                    b.HasOne("server.Core.Models.Author.AuthorModel", "author")
                        .WithMany("Book")
                        .HasForeignKey("author_id");

                    b.HasOne("server.Core.Models.PublishingCompany.PublishingCompanyModel", "publishingCompany")
                        .WithMany("Book")
                        .HasForeignKey("publishing_id");

                    b.HasOne("server.Core.Models.Category.TypeBookModel", "typeBook")
                        .WithMany("Book")
                        .HasForeignKey("type_id");

                    b.Navigation("author");

                    b.Navigation("publishingCompany");

                    b.Navigation("typeBook");
                });

            modelBuilder.Entity("server.Core.Models.Reader.ReaderModel", b =>
                {
                    b.HasOne("server.Core.Entities.LibraryCard.LibraryCardModel", "library_card")
                        .WithMany("reader")
                        .HasForeignKey("library_card_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("library_card");
                });

            modelBuilder.Entity("server.Core.Entities.LibraryCard.LibraryCardModel", b =>
                {
                    b.Navigation("loanSlip");

                    b.Navigation("reader");
                });

            modelBuilder.Entity("server.Core.Entities.LoanSlip.LoanSlipModel", b =>
                {
                    b.Navigation("borrowed_detail");
                });

            modelBuilder.Entity("server.Core.Models.Author.AuthorModel", b =>
                {
                    b.Navigation("Book");
                });

            modelBuilder.Entity("server.Core.Models.Book.BookModel", b =>
                {
                    b.Navigation("borrowedDetail");
                });

            modelBuilder.Entity("server.Core.Models.Category.TypeBookModel", b =>
                {
                    b.Navigation("Book");
                });

            modelBuilder.Entity("server.Core.Models.PublishingCompany.PublishingCompanyModel", b =>
                {
                    b.Navigation("Book");
                });
#pragma warning restore 612, 618
        }
    }
}
