using DAL.Contexts;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Services
{
    public class TransModel
    {
        public int Id { get; set; }
        public string Ward { get; set; }
        public string Cig { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string AgeGroup { get; set; }
        public string ValueChain { get; set; }
        public string Iw { get; set; }
        public string Category { get; set; }
        public string CCAT { get; set; }
        public string LCAT { get; set; }
        public string TotalLivestock { get; set; }
        public string Qty { get; set; }
        public string Production { get; set; }
        public double Acreage { get; set; }
        public string Variety { get; set; }
        public string x { get; set; }
        public string y { get; set; }
    }
}
