using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class UserInreview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "02e3fbf1-08b7-4777-95d7-9a74bc1cbe50");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "71baad15-2f84-4059-ad8f-2305bb9df9ff");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Reviews",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "cf6d4733-253c-4851-99d4-08ea68627d00", null, "Admin", "ADMIN" },
                    { "dbaad7e7-22a2-4d9e-aef6-c7e198247cb8", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AppUserId",
                table: "Reviews",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_AppUserId",
                table: "Reviews",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_AppUserId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_AppUserId",
                table: "Reviews");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf6d4733-253c-4851-99d4-08ea68627d00");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dbaad7e7-22a2-4d9e-aef6-c7e198247cb8");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Reviews");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "02e3fbf1-08b7-4777-95d7-9a74bc1cbe50", null, "Admin", "ADMIN" },
                    { "71baad15-2f84-4059-ad8f-2305bb9df9ff", null, "User", "USER" }
                });
        }
    }
}
