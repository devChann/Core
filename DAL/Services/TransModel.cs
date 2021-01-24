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
        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string AgeGroup { get; set; }
        public string SubCounty { get; set; }
        public string Ward { get; set; }
        public string Vcgroup { get; set; }
        public string C302 { get; set; }
        public string C11501 { get; set; }
        public string C11301 { get; set; }
        public double Long { get; set; }
        public double Lat { get; set; }

        public Geometry Geometry { get; set; }
        public List<Txns> Txns { get; set; }
    }
}
