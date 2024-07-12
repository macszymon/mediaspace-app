using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class TitlePlatofrms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1474690d-3ea7-4510-80fb-fb493b9cf92d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8102725f-7f9f-4d1b-aa67-b553480aec23");

            migrationBuilder.AddColumn<string>(
                name: "Platforms",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "875835fd-b480-4893-8d9b-5506c2a58e56", null, "User", "USER" },
                    { "ccfaec9e-1146-40a9-b600-ff5966357a01", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "875835fd-b480-4893-8d9b-5506c2a58e56");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ccfaec9e-1146-40a9-b600-ff5966357a01");

            migrationBuilder.DropColumn(
                name: "Platforms",
                table: "Titles");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1474690d-3ea7-4510-80fb-fb493b9cf92d", null, "User", "USER" },
                    { "8102725f-7f9f-4d1b-aa67-b553480aec23", null, "Admin", "ADMIN" }
                });
        }
    }
}
