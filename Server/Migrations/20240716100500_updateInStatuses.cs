using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class updateInStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TitleStatuses",
                table: "TitleStatuses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0865b105-e29b-43f7-a1eb-93064e98d07a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d4a6f232-a6af-4ed5-ab7c-246d3c4f8ce7");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TitleStatuses",
                table: "TitleStatuses",
                columns: new[] { "TitleId", "AppUserId" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0c7dd49b-ac20-493b-97b1-7354a87d1194", null, "User", "USER" },
                    { "8d9eab93-51e2-400e-8caf-ab5eaa10837e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TitleStatuses",
                table: "TitleStatuses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c7dd49b-ac20-493b-97b1-7354a87d1194");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8d9eab93-51e2-400e-8caf-ab5eaa10837e");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TitleStatuses",
                table: "TitleStatuses",
                columns: new[] { "TitleId", "StatusId", "AppUserId" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0865b105-e29b-43f7-a1eb-93064e98d07a", null, "User", "USER" },
                    { "d4a6f232-a6af-4ed5-ab7c-246d3c4f8ce7", null, "Admin", "ADMIN" }
                });
        }
    }
}
