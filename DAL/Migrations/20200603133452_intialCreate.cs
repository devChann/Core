using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

namespace DAL.Migrations
{
    public partial class intialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    AgeGroup = table.Column<string>(nullable: true),
                    SubCounty = table.Column<string>(nullable: true),
                    Ward = table.Column<string>(nullable: true),
                    Vcgroup = table.Column<string>(nullable: true),
                    C10101 = table.Column<int>(nullable: true),
                    C10102 = table.Column<int>(nullable: true),
                    C10103 = table.Column<int>(nullable: true),
                    C10104 = table.Column<int>(nullable: true),
                    C10105 = table.Column<int>(nullable: true),
                    C10106 = table.Column<int>(nullable: true),
                    C10107 = table.Column<int>(nullable: true),
                    C10108 = table.Column<int>(nullable: true),
                    C10109 = table.Column<int>(nullable: true),
                    C10110 = table.Column<int>(nullable: true),
                    C10111 = table.Column<int>(nullable: true),
                    C10112 = table.Column<int>(nullable: true),
                    C10113 = table.Column<int>(nullable: true),
                    C10114 = table.Column<int>(nullable: true),
                    C10115 = table.Column<int>(nullable: true),
                    C10116 = table.Column<int>(nullable: true),
                    C10117 = table.Column<int>(nullable: true),
                    C10118 = table.Column<int>(nullable: true),
                    C10119 = table.Column<int>(nullable: true),
                    C10120 = table.Column<double>(nullable: true),
                    C10201 = table.Column<int>(nullable: true),
                    C10202 = table.Column<int>(nullable: true),
                    C10203 = table.Column<int>(nullable: true),
                    C10204 = table.Column<int>(nullable: true),
                    C10205 = table.Column<int>(nullable: true),
                    C10206 = table.Column<int>(nullable: true),
                    C10207 = table.Column<int>(nullable: true),
                    C10208 = table.Column<int>(nullable: true),
                    C10209 = table.Column<int>(nullable: true),
                    C10210 = table.Column<int>(nullable: true),
                    C10211 = table.Column<int>(nullable: true),
                    C10212 = table.Column<int>(nullable: true),
                    C10301 = table.Column<int>(nullable: true),
                    C10302 = table.Column<int>(nullable: true),
                    C10303 = table.Column<int>(nullable: true),
                    C10304 = table.Column<int>(nullable: true),
                    C10305 = table.Column<int>(nullable: true),
                    C10306 = table.Column<int>(nullable: true),
                    C10307 = table.Column<int>(nullable: true),
                    C10308 = table.Column<int>(nullable: true),
                    C10401 = table.Column<int>(nullable: true),
                    C10402 = table.Column<int>(nullable: true),
                    C10403 = table.Column<int>(nullable: true),
                    C10404 = table.Column<int>(nullable: true),
                    C10405 = table.Column<int>(nullable: true),
                    C10406 = table.Column<int>(nullable: true),
                    C10407 = table.Column<int>(nullable: true),
                    C10408 = table.Column<int>(nullable: true),
                    C10409 = table.Column<int>(nullable: true),
                    C10410 = table.Column<int>(nullable: true),
                    C10501 = table.Column<int>(nullable: true),
                    C10502 = table.Column<int>(nullable: true),
                    C10503 = table.Column<int>(nullable: true),
                    C10504 = table.Column<int>(nullable: true),
                    C10505 = table.Column<int>(nullable: true),
                    C10506 = table.Column<int>(nullable: true),
                    C10507 = table.Column<int>(nullable: true),
                    C10508 = table.Column<int>(nullable: true),
                    C10509 = table.Column<int>(nullable: true),
                    C10510 = table.Column<int>(nullable: true),
                    C10511 = table.Column<int>(nullable: true),
                    C10512 = table.Column<int>(nullable: true),
                    C10601 = table.Column<int>(nullable: true),
                    C10602 = table.Column<int>(nullable: true),
                    C10603 = table.Column<int>(nullable: true),
                    C10604 = table.Column<int>(nullable: true),
                    C10605 = table.Column<int>(nullable: true),
                    C10606 = table.Column<int>(nullable: true),
                    C10607 = table.Column<int>(nullable: true),
                    C10608 = table.Column<int>(nullable: true),
                    C10609 = table.Column<int>(nullable: true),
                    C10610 = table.Column<int>(nullable: true),
                    C10611 = table.Column<int>(nullable: true),
                    C10612 = table.Column<int>(nullable: true),
                    C10701 = table.Column<int>(nullable: true),
                    C10702 = table.Column<int>(nullable: true),
                    C10703 = table.Column<int>(nullable: true),
                    C10704 = table.Column<int>(nullable: true),
                    C10705 = table.Column<int>(nullable: true),
                    C10706 = table.Column<int>(nullable: true),
                    C10707 = table.Column<int>(nullable: true),
                    C10708 = table.Column<int>(nullable: true),
                    C10801 = table.Column<int>(nullable: true),
                    C10802 = table.Column<int>(nullable: true),
                    C10803 = table.Column<int>(nullable: true),
                    C10804 = table.Column<int>(nullable: true),
                    C10805 = table.Column<int>(nullable: true),
                    C10806 = table.Column<int>(nullable: true),
                    C10807 = table.Column<int>(nullable: true),
                    C10901 = table.Column<int>(nullable: true),
                    C11001 = table.Column<int>(nullable: true),
                    C11002 = table.Column<int>(nullable: true),
                    C11003 = table.Column<int>(nullable: true),
                    C11004 = table.Column<int>(nullable: true),
                    C11005 = table.Column<int>(nullable: true),
                    C11006 = table.Column<int>(nullable: true),
                    C11101 = table.Column<int>(nullable: true),
                    C11201 = table.Column<int>(nullable: true),
                    C11202 = table.Column<int>(nullable: true),
                    C11203 = table.Column<int>(nullable: true),
                    C11204 = table.Column<int>(nullable: true),
                    C11205 = table.Column<int>(nullable: true),
                    C11301 = table.Column<int>(nullable: true),
                    C11401 = table.Column<int>(nullable: true),
                    C11501 = table.Column<int>(nullable: true),
                    C201 = table.Column<int>(nullable: true),
                    C202 = table.Column<int>(nullable: true),
                    C203 = table.Column<int>(nullable: true),
                    C204 = table.Column<int>(nullable: true),
                    C205 = table.Column<int>(nullable: true),
                    C206 = table.Column<int>(nullable: true),
                    C207 = table.Column<int>(nullable: true),
                    C208 = table.Column<int>(nullable: true),
                    C209 = table.Column<int>(nullable: true),
                    C210 = table.Column<int>(nullable: true),
                    C211 = table.Column<int>(nullable: true),
                    C212 = table.Column<int>(nullable: true),
                    C213 = table.Column<int>(nullable: true),
                    C214 = table.Column<int>(nullable: true),
                    C215 = table.Column<int>(nullable: true),
                    C216 = table.Column<int>(nullable: true),
                    C217 = table.Column<int>(nullable: true),
                    C301 = table.Column<int>(nullable: true),
                    C302 = table.Column<int>(nullable: true),
                    C303 = table.Column<int>(nullable: true),
                    C304 = table.Column<int>(nullable: true),
                    C305 = table.Column<int>(nullable: true),
                    C306 = table.Column<int>(nullable: true),
                    C401 = table.Column<string>(nullable: true),
                    C402 = table.Column<string>(nullable: true),
                    C403 = table.Column<string>(nullable: true),
                    C404 = table.Column<int>(nullable: true),
                    C405 = table.Column<int>(nullable: true),
                    C406 = table.Column<string>(nullable: true),
                    C407 = table.Column<int>(nullable: true),
                    C408 = table.Column<int>(nullable: true),
                    C409 = table.Column<int>(nullable: true),
                    C410 = table.Column<int>(nullable: true),
                    C411 = table.Column<string>(nullable: true),
                    C501 = table.Column<string>(nullable: true),
                    C502 = table.Column<string>(nullable: true),
                    C503 = table.Column<string>(nullable: true),
                    C504 = table.Column<int>(nullable: true),
                    C505 = table.Column<int>(nullable: true),
                    C601 = table.Column<string>(nullable: true),
                    C602 = table.Column<string>(nullable: true),
                    C603 = table.Column<int>(nullable: true),
                    Geometry = table.Column<Geometry>(nullable: true),
                    Lastupdatetime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Txns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UpdateTime = table.Column<DateTime>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    Produce = table.Column<string>(nullable: true),
                    Breed = table.Column<string>(nullable: true),
                    BreedGender = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: true),
                    Revenue = table.Column<double>(nullable: false),
                    AmtofMilkdp = table.Column<int>(nullable: false),
                    Age = table.Column<string>(nullable: true),
                    TransactionId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Txns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Txns_Transactions_TransactionId",
                        column: x => x.TransactionId,
                        principalTable: "Transactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Txns_TransactionId",
                table: "Txns",
                column: "TransactionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Txns");

            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
