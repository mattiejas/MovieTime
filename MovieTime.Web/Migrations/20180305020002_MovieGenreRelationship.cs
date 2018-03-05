using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MovieTime.Web.Migrations
{
    public partial class MovieGenreRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Genres_Movies_DbMovieId",
                table: "Genres");

            migrationBuilder.DropIndex(
                name: "IX_Genres_DbMovieId",
                table: "Genres");

            migrationBuilder.DropColumn(
                name: "DbMovieId",
                table: "Genres");

            migrationBuilder.CreateTable(
                name: "MovieGenre",
                columns: table => new
                {
                    DbMovieId = table.Column<Guid>(nullable: false),
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

            migrationBuilder.AddColumn<Guid>(
                name: "DbMovieId",
                table: "Genres",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Genres_DbMovieId",
                table: "Genres",
                column: "DbMovieId");

            migrationBuilder.AddForeignKey(
                name: "FK_Genres_Movies_DbMovieId",
                table: "Genres",
                column: "DbMovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
