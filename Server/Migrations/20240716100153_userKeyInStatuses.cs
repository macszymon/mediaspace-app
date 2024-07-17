using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class userKeyInStatuses : Migration
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
                keyValue: "15ce20e8-4a65-45be-806a-f16066867161");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67f3d386-a786-4a91-a2f5-70a15fb06fdd");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                columns: new[] { "TitleId", "StatusId" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "15ce20e8-4a65-45be-806a-f16066867161", null, "Admin", "ADMIN" },
                    { "67f3d386-a786-4a91-a2f5-70a15fb06fdd", null, "User", "USER" }
                });
        }
    }
}
