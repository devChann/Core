using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using GeoAPI.Geometries;

namespace DAL.Entities
{
    public class Transactions
    {
        [Key]
        [MaxLength(36)]
        public char Id { get; set; }

        public string Name { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string AgeGroup { get; set; }
        public string SubCounty { get; set; }
        public string Ward { get; set; }
        public string Vcgroup { get; set; }
        public List<Txns> Txns { get; set; } = new List<Txns>();

        public int? C10101 { get; set; }
        public int? C10102 { get; set; }
        public int? C10103 { get; set; }
        public int? C10104 { get; set; }
        public int? C10105 { get; set; }
        public int? C10106 { get; set; }
        public int? C10107 { get; set; }
        public int? C10108 { get; set; }
        public int? C10109 { get; set; }
        public int? C10110 { get; set; }
        public int? C10111 { get; set; }
        public int? C10112 { get; set; }
        public int? C10113 { get; set; }
        public int? C10114 { get; set; }
        public int? C10115 { get; set; }
        public int? C10116 { get; set; }
        public int? C10117 { get; set; }
        public int? C10118 { get; set; }
        public int? C10119 { get; set; }
        public int? C10120 { get; set; }
        public int? C10201 { get; set; }
        public int? C10202 { get; set; }
        public int? C10203 { get; set; }
        public int? C10204 { get; set; }
        public int? C10205 { get; set; }
        public int? C10206 { get; set; }
        public int? C10207 { get; set; }
        public int? C10208 { get; set; }
        public int? C10209 { get; set; }
        public int? C10210 { get; set; }
        public int? C10211 { get; set; }
        public int? C10212 { get; set; }
        public int? C10301 { get; set; }
        public int? C10302 { get; set; }
        public int? C10303 { get; set; }
        public int? C10304 { get; set; }
        public int? C10305 { get; set; }
        public int? C10306 { get; set; }
        public int? C10307 { get; set; }
        public int? C10308 { get; set; }
        public int? C10401 { get; set; }
        public int? C10402 { get; set; }
        public int? C10403 { get; set; }
        public int? C10404 { get; set; }
        public int? C10405 { get; set; }
        public int? C10406 { get; set; }
        public int? C10407 { get; set; }
        public int? C10408 { get; set; }
        public int? C10409 { get; set; }
        public int? C10410 { get; set; }
        public int? C10501 { get; set; }
        public int? C10502 { get; set; }
        public int? C10503 { get; set; }
        public int? C10504 { get; set; }
        public int? C10505 { get; set; }
        public int? C10506 { get; set; }
        public int? C10507 { get; set; }
        public int? C10508 { get; set; }
        public int? C10509 { get; set; }
        public int? C10510 { get; set; }
        public int? C10511 { get; set; }
        public int? C10512 { get; set; }
        public int? C10601 { get; set; }
        public int? C10602 { get; set; }
        public int? C10603 { get; set; }
        public int? C10604 { get; set; }
        public int? C10605 { get; set; }
        public int? C10606 { get; set; }
        public int? C10607 { get; set; }
        public int? C10608 { get; set; }
        public int? C10609 { get; set; }
        public int? C10610 { get; set; }
        public int? C10611 { get; set; }
        public int? C10612 { get; set; }
        public int? C10701 { get; set; }
        public int? C10702 { get; set; }
        public int? C10703 { get; set; }
        public int? C10704 { get; set; }
        public int? C10705 { get; set; }
        public int? C10706 { get; set; }
        public int? C10707 { get; set; }
        public int? C10708 { get; set; }
        public int? C10801 { get; set; }
        public int? C10802 { get; set; }
        public int? C10803 { get; set; }
        public int? C10804 { get; set; }
        public int? C10805 { get; set; }
        public int? C10806 { get; set; }
        public int? C10807 { get; set; }
        public int? C10901 { get; set; }
        public int? C11001 { get; set; }
        public int? C11002 { get; set; }
        public int? C11003 { get; set; }
        public int? C11004 { get; set; }
        public int? C11005 { get; set; }
        public int? C11006 { get; set; }
        public int? C11101 { get; set; }
        public int? C11201 { get; set; }
        public int? C11202 { get; set; }
        public int? C11203 { get; set; }
        public int? C11204 { get; set; }
        public int? C11205 { get; set; }
        public int? C11301 { get; set; }
        public int? C11401 { get; set; }
        public int? C11501 { get; set; }
        public int? C201 { get; set; }
        public int? C202 { get; set; }
        public int? C203 { get; set; }
        public int? C204 { get; set; }
        public int? C205 { get; set; }
        public int? C206 { get; set; }
        public int? C207 { get; set; }
        public int? C208 { get; set; }
        public int? C209 { get; set; }
        public int? C210 { get; set; }
        public int? C211 { get; set; }
        public int? C212 { get; set; }
        public int? C213 { get; set; }
        public int? C214 { get; set; }
        public int? C215 { get; set; }
        public int? C216 { get; set; }
        public int? C217 { get; set; }
        public int? C301 { get; set; }
        public int? C302 { get; set; }
        public int? C303 { get; set; }
        public int? C304 { get; set; }
        public int? C305 { get; set; }
        public int? C306 { get; set; }
        public string C401 { get; set; }
        public string C402 { get; set; }
        public string C403 { get; set; }
        public int? C404 { get; set; }
        public int? C405 { get; set; }
        public string C406 { get; set; }
        public int? C407 { get; set; }
        public int? C408 { get; set; }
        public int? C409 { get; set; }
        public int? C410 { get; set; }
        public string C411 { get; set; }
        public string C501 { get; set; }
        public string C502 { get; set; }
        public string C503 { get; set; }
        public int? C504 { get; set; }
        public int? C505 { get; set; }
        public string C601 { get; set; }
        public string C602 { get; set; }
        public int? C603 { get; set; }
        public Geometry Geometry { get; set; }
        public DateTime? Lastupdatetime { get; set; }
    
}
}
