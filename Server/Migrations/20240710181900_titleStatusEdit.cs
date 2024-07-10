using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class titleStatusEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TitleStatuses_AspNetUsers_AppUserId1",
                table: "TitleStatuses");

            migrationBuilder.DropIndex(
                name: "IX_TitleStatuses_AppUserId1",
                table: "TitleStatuses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "27888d78-7dcf-44f5-b4f9-bdb5de6daa95");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7d41c607-52fb-445d-a4b0-dbff52316c03");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "TitleStatuses");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "TitleStatuses",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2150b624-95fe-48c7-9e4b-c17400b1d477", null, "Admin", "ADMIN" },
                    { "8b4e7e9b-5690-42bf-925c-d5c568c2d935", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TitleStatuses_AppUserId",
                table: "TitleStatuses",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TitleStatuses_AspNetUsers_AppUserId",
                table: "TitleStatuses",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TitleStatuses_AspNetUsers_AppUserId",
                table: "TitleStatuses");

            migrationBuilder.DropIndex(
                name: "IX_TitleStatuses_AppUserId",
                table: "TitleStatuses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2150b624-95fe-48c7-9e4b-c17400b1d477");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b4e7e9b-5690-42bf-925c-d5c568c2d935");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "TitleStatuses",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "TitleStatuses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "27888d78-7dcf-44f5-b4f9-bdb5de6daa95", null, "Admin", "ADMIN" },
                    { "7d41c607-52fb-445d-a4b0-dbff52316c03", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TitleStatuses_AppUserId1",
                table: "TitleStatuses",
                column: "AppUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_TitleStatuses_AspNetUsers_AppUserId1",
                table: "TitleStatuses",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
