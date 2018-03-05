using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MovieTime.Web.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Actors = table.Column<string>(maxLength: 200, nullable: false),
                    Director = table.Column<string>(maxLength: 200, nullable: false),
                    ImdbId = table.Column<string>(nullable: true),
                    Plot = table.Column<string>(maxLength: 600, nullable: false),
                    Poster = table.Column<string>(nullable: false),
                    Rated = table.Column<double>(nullable: false),
                    RunTimeInMinutes = table.Column<int>(maxLength: 1440, nullable: false),
                    Title = table.Column<string>(maxLength: 40, nullable: false),
                    Writer = table.Column<string>(maxLength: 200, nullable: false),
                    Year = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Genres",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false),
                    CustomField = table.Column<bool>(nullable: false),
                    DbMovieId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Name);
                    table.ForeignKey(
                        name: "FK_Genres_Movies_DbMovieId",
                        column: x => x.DbMovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Genres_DbMovieId",
                table: "Genres",
                column: "DbMovieId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Genres");

            migrationBuilder.DropTable(
                name: "Movies");
        }
    }
}
