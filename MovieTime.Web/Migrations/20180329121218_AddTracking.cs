using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MovieTime.Web.Migrations
{
    public partial class AddTracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TestMigration",
                table: "Genres");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedTime",
                table: "TrackedMovies",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedTime",
                table: "TrackedMovies");

            migrationBuilder.AddColumn<string>(
                name: "TestMigration",
                table: "Genres",
                nullable: true);
        }
    }
}
