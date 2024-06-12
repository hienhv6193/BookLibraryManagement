using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Author",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Author", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "LibraryCard",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    card_created_date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    card_expiry_date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    note = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryCard", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PublishingCompany",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublishingCompany", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TypeBook",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeBook", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "LoanSlip",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    library_card_id = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanSlip", x => x.id);
                    table.ForeignKey(
                        name: "FK_LoanSlip_LibraryCard_library_card_id",
                        column: x => x.library_card_id,
                        principalTable: "LibraryCard",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reader",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    library_card_id = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reader", x => x.id);
                    table.ForeignKey(
                        name: "FK_Reader_LibraryCard_library_card_id",
                        column: x => x.library_card_id,
                        principalTable: "LibraryCard",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    type_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    author_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    publishing_id = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.id);
                    table.ForeignKey(
                        name: "FK_Book_Author_author_id",
                        column: x => x.author_id,
                        principalTable: "Author",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Book_PublishingCompany_publishing_id",
                        column: x => x.publishing_id,
                        principalTable: "PublishingCompany",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Book_TypeBook_type_id",
                        column: x => x.type_id,
                        principalTable: "TypeBook",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "BorrowDetail",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    book_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    borrowed_day = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pay_day = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BorrowDetail", x => x.id);
                    table.ForeignKey(
                        name: "FK_BorrowDetail_Book_book_id",
                        column: x => x.book_id,
                        principalTable: "Book",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BorrowDetail_LoanSlip_id",
                        column: x => x.id,
                        principalTable: "LoanSlip",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Book_author_id",
                table: "Book",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "IX_Book_publishing_id",
                table: "Book",
                column: "publishing_id");

            migrationBuilder.CreateIndex(
                name: "IX_Book_type_id",
                table: "Book",
                column: "type_id");

            migrationBuilder.CreateIndex(
                name: "IX_BorrowDetail_book_id",
                table: "BorrowDetail",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "IX_LoanSlip_library_card_id",
                table: "LoanSlip",
                column: "library_card_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reader_library_card_id",
                table: "Reader",
                column: "library_card_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BorrowDetail");

            migrationBuilder.DropTable(
                name: "Reader");

            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropTable(
                name: "LoanSlip");

            migrationBuilder.DropTable(
                name: "Author");

            migrationBuilder.DropTable(
                name: "PublishingCompany");

            migrationBuilder.DropTable(
                name: "TypeBook");

            migrationBuilder.DropTable(
                name: "LibraryCard");
        }
    }
}
