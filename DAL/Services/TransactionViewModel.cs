using NetTopologySuite.Geometries;
using NetTopologySuite.Index.Strtree;
using System.Collections.Generic;

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
        public string C302 { get; set; }
        public string C11501 { get; set; }
        public string C11301 { get; set; }
        public Geometry Geometry { get; set; }
        public IEnumerable<Contexts.Txns> Results { get; set; }

        public TransactionViewModel(string id,string name, string phone, string gender, string ageGroup, string subCounty, string ward, string vcgroup,string c302,string c11501,string c11301, Geometry geometry, IEnumerable<Contexts.Txns> results)
        {
            Id = id;
            Name = name;
            Phone = phone;
            Gender = gender;
            AgeGroup = ageGroup;
            SubCounty = subCounty;
            Ward = ward;
            Vcgroup = vcgroup;
            C302 = c302;
            C11501 = c11501;
            C11301 = c11301;
            Geometry = geometry;
            Results = results;
        }
    }
}
