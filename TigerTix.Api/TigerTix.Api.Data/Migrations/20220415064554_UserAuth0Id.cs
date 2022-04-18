using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TigerTix.Api.Data.Migrations
{
    public partial class UserAuth0Id : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShowAssociate_Shows_ShowId",
                table: "ShowAssociate");

            migrationBuilder.DropForeignKey(
                name: "FK_ShowAssociate_Users_UserId",
                table: "ShowAssociate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShowAssociate",
                table: "ShowAssociate");

            migrationBuilder.RenameTable(
                name: "ShowAssociate",
                newName: "Associates");

            migrationBuilder.RenameIndex(
                name: "IX_ShowAssociate_UserId",
                table: "Associates",
                newName: "IX_Associates_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ShowAssociate_ShowId",
                table: "Associates",
                newName: "IX_Associates_ShowId");

            migrationBuilder.AddColumn<string>(
                name: "Auth0Id",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<double>(
                name: "EntryPrice",
                table: "Shows",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Associates",
                table: "Associates",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Auth0Id_Id",
                table: "Users",
                columns: new[] { "Auth0Id", "Id" });

            migrationBuilder.AddForeignKey(
                name: "FK_Associates_Shows_ShowId",
                table: "Associates",
                column: "ShowId",
                principalTable: "Shows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Associates_Users_UserId",
                table: "Associates",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Associates_Shows_ShowId",
                table: "Associates");

            migrationBuilder.DropForeignKey(
                name: "FK_Associates_Users_UserId",
                table: "Associates");

            migrationBuilder.DropIndex(
                name: "IX_Users_Auth0Id_Id",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Associates",
                table: "Associates");

            migrationBuilder.DropColumn(
                name: "Auth0Id",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Associates",
                newName: "ShowAssociate");

            migrationBuilder.RenameIndex(
                name: "IX_Associates_UserId",
                table: "ShowAssociate",
                newName: "IX_ShowAssociate_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Associates_ShowId",
                table: "ShowAssociate",
                newName: "IX_ShowAssociate_ShowId");

            migrationBuilder.AlterColumn<decimal>(
                name: "EntryPrice",
                table: "Shows",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShowAssociate",
                table: "ShowAssociate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShowAssociate_Shows_ShowId",
                table: "ShowAssociate",
                column: "ShowId",
                principalTable: "Shows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShowAssociate_Users_UserId",
                table: "ShowAssociate",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
