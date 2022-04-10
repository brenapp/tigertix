using Microsoft.EntityFrameworkCore.Migrations;
using NodaTime;

#nullable disable

namespace TigerTix.Api.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Venues",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    MaxCapacity = table.Column<long>(type: "bigint", nullable: false),
                    OwnerId = table.Column<decimal>(type: "numeric(20,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Venues_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Shows",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    VenueId = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Start = table.Column<LocalDateTime>(type: "timestamp without time zone", nullable: false),
                    End = table.Column<LocalDateTime>(type: "timestamp without time zone", nullable: false),
                    ImageHero = table.Column<string>(type: "text", nullable: false),
                    ImageThumbnail = table.Column<string>(type: "text", nullable: false),
                    EntryPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    Capacity = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shows_Venues_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContentBlocks",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    ShowId = table.Column<decimal>(type: "numeric(20,0)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentBlocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentBlocks_Shows_ShowId",
                        column: x => x.ShowId,
                        principalTable: "Shows",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShowAssociate",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    ShowId = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    UserId = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShowAssociate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShowAssociate_Shows_ShowId",
                        column: x => x.ShowId,
                        principalTable: "Shows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShowAssociate_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShowUser",
                columns: table => new
                {
                    ShowsId = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    UsersId = table.Column<decimal>(type: "numeric(20,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShowUser", x => new { x.ShowsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ShowUser_Shows_ShowsId",
                        column: x => x.ShowsId,
                        principalTable: "Shows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShowUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentBlocks_ShowId",
                table: "ContentBlocks",
                column: "ShowId");

            migrationBuilder.CreateIndex(
                name: "IX_ShowAssociate_ShowId",
                table: "ShowAssociate",
                column: "ShowId");

            migrationBuilder.CreateIndex(
                name: "IX_ShowAssociate_UserId",
                table: "ShowAssociate",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Shows_VenueId",
                table: "Shows",
                column: "VenueId");

            migrationBuilder.CreateIndex(
                name: "IX_ShowUser_UsersId",
                table: "ShowUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Venues_OwnerId",
                table: "Venues",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentBlocks");

            migrationBuilder.DropTable(
                name: "ShowAssociate");

            migrationBuilder.DropTable(
                name: "ShowUser");

            migrationBuilder.DropTable(
                name: "Shows");

            migrationBuilder.DropTable(
                name: "Venues");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
