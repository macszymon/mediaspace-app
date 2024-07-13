using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class isbnToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "875835fd-b480-4893-8d9b-5506c2a58e56");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ccfaec9e-1146-40a9-b600-ff5966357a01");

            migrationBuilder.AlterColumn<string>(
                name: "Isbn",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9c86904d-dad0-45a8-9358-265ee07fd6e5", null, "User", "USER" },
                    { "a81c35b4-feed-4833-a26a-cc01b6701f71", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c86904d-dad0-45a8-9358-265ee07fd6e5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a81c35b4-feed-4833-a26a-cc01b6701f71");

            migrationBuilder.AlterColumn<int>(
                name: "Isbn",
                table: "Titles",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "875835fd-b480-4893-8d9b-5506c2a58e56", null, "User", "USER" },
                    { "ccfaec9e-1146-40a9-b600-ff5966357a01", null, "Admin", "ADMIN" }
                });
        }
    }
}
