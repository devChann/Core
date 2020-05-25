using DAL.Entities;
using GeoAPI.Geometries;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Services
{
    public class TransactionViewModel
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string AgeGroup { get; set; }
        public string SubCounty { get; set; }
        public string Ward { get; set; }
        public string Vcgroup { get; set; }
        public List<Txns> Txns { get; set; }
    }
}
