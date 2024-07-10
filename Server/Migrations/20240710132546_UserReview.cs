using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class UserReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf6d4733-253c-4851-99d4-08ea68627d00");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dbaad7e7-22a2-4d9e-aef6-c7e198247cb8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2cf11c5c-548b-4761-a85d-0045a6d60ce3", null, "Admin", "ADMIN" },
                    { "8fdae377-7fdc-45b1-aa5c-a22d83187855", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cf11c5c-548b-4761-a85d-0045a6d60ce3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fdae377-7fdc-45b1-aa5c-a22d83187855");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "cf6d4733-253c-4851-99d4-08ea68627d00", null, "Admin", "ADMIN" },
                    { "dbaad7e7-22a2-4d9e-aef6-c7e198247cb8", null, "User", "USER" }
                });
        }
    }
}
