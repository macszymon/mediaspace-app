using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class userStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c86904d-dad0-45a8-9358-265ee07fd6e5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a81c35b4-feed-4833-a26a-cc01b6701f71");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "15ce20e8-4a65-45be-806a-f16066867161", null, "Admin", "ADMIN" },
                    { "67f3d386-a786-4a91-a2f5-70a15fb06fdd", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "15ce20e8-4a65-45be-806a-f16066867161");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67f3d386-a786-4a91-a2f5-70a15fb06fdd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9c86904d-dad0-45a8-9358-265ee07fd6e5", null, "User", "USER" },
                    { "a81c35b4-feed-4833-a26a-cc01b6701f71", null, "Admin", "ADMIN" }
                });
        }
    }
}
