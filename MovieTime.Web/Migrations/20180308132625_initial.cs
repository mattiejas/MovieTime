using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MovieTime.Web.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Genres",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false),
                    CustomField = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Actors = table.Column<string>(maxLength: 200, nullable: false),
                    Director = table.Column<string>(maxLength: 200, nullable: false),
                    Plot = table.Column<string>(maxLength: 600, nullable: false),
                    Poster = table.Column<string>(nullable: false),
                    Rated = table.Column<string>(nullable: false),
                    Rating = table.Column<double>(nullable: false),
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
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MovieGenre",
                columns: table => new
                {
                    DbMovieId = table.Column<string>(nullable: false),
                    DbGenreId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieGenre", x => new { x.DbMovieId, x.DbGenreId });
                    table.ForeignKey(
                        name: "FK_MovieGenre_Genres_DbGenreId",
                        column: x => x.DbGenreId,
                        principalTable: "Genres",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieGenre_Movies_DbMovieId",
                        column: x => x.DbMovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieGenre_DbGenreId",
                table: "MovieGenre",
                column: "DbGenreId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieGenre");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Genres");

            migrationBuilder.DropTable(
                name: "Movies");
        }
    }
}
