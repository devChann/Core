using DAL.Contexts;
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

        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string AgeGroup { get; set; }
        public string SubCounty { get; set; }
        public string Ward { get; set; }
        public string Vcgroup { get; set; }
        public Geometry Geometry { get; set; }
        public IEnumerable<Contexts.Txns> Results { get; set; }

        public TransactionViewModel(string id,string name, string phone, string gender, string ageGroup, string subCounty, string ward, string vcgroup, Geometry geometry, IEnumerable<Contexts.Txns> results)
        {
            Id = id;
            Name = name;
            Phone = phone;
            Gender = gender;
            AgeGroup = ageGroup;
            SubCounty = subCounty;
            Ward = ward;
            Vcgroup = vcgroup;
            Geometry = geometry;
            Results = results;
        }
    }
}
