using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class init_three : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Txns_Transactions_TransactionsId",
                table: "Txns");

            migrationBuilder.DropIndex(
                name: "IX_Txns_TransactionsId",
                table: "Txns");

            migrationBuilder.DropColumn(
                name: "TransactionsId",
                table: "Txns");

            migrationBuilder.AlterColumn<string>(
                name: "TransactionId",
                table: "Txns",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(36)",
                oldMaxLength: 36);

            migrationBuilder.CreateIndex(
                name: "IX_Txns_TransactionId",
                table: "Txns",
                column: "TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Txns_Transactions_TransactionId",
                table: "Txns",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Txns_Transactions_TransactionId",
                table: "Txns");

            migrationBuilder.DropIndex(
                name: "IX_Txns_TransactionId",
                table: "Txns");

            migrationBuilder.AlterColumn<string>(
                name: "TransactionId",
                table: "Txns",
                type: "nvarchar(36)",
                maxLength: 36,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransactionsId",
                table: "Txns",
                type: "nvarchar(36)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Txns_TransactionsId",
                table: "Txns",
                column: "TransactionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Txns_Transactions_TransactionsId",
                table: "Txns",
                column: "TransactionsId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
