using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class EditDatesTitleStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2150b624-95fe-48c7-9e4b-c17400b1d477");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b4e7e9b-5690-42bf-925c-d5c568c2d935");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "TitleStatuses",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "EndDate",
                table: "TitleStatuses",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1474690d-3ea7-4510-80fb-fb493b9cf92d", null, "User", "USER" },
                    { "8102725f-7f9f-4d1b-aa67-b553480aec23", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1474690d-3ea7-4510-80fb-fb493b9cf92d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8102725f-7f9f-4d1b-aa67-b553480aec23");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "TitleStatuses",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "EndDate",
                table: "TitleStatuses",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2150b624-95fe-48c7-9e4b-c17400b1d477", null, "Admin", "ADMIN" },
                    { "8b4e7e9b-5690-42bf-925c-d5c568c2d935", null, "User", "USER" }
                });
        }
    }
}
