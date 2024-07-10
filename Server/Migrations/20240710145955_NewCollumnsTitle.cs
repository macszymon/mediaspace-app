using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class NewCollumnsTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cf11c5c-548b-4761-a85d-0045a6d60ce3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fdae377-7fdc-45b1-aa5c-a22d83187855");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Creator",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Developer",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Director",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductionCompany",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Publisher",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Writer",
                table: "Titles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "186292e2-26cc-4664-a362-c22bddc01f37", null, "User", "USER" },
                    { "d3b4cd90-91cc-4635-bf55-148355fddc2e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "186292e2-26cc-4664-a362-c22bddc01f37");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d3b4cd90-91cc-4635-bf55-148355fddc2e");

            migrationBuilder.DropColumn(
                name: "Author",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "Creator",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "Developer",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "Director",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "ProductionCompany",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "Publisher",
                table: "Titles");

            migrationBuilder.DropColumn(
                name: "Writer",
                table: "Titles");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2cf11c5c-548b-4761-a85d-0045a6d60ce3", null, "Admin", "ADMIN" },
                    { "8fdae377-7fdc-45b1-aa5c-a22d83187855", null, "User", "USER" }
                });
        }
    }
}
