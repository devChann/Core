using System;
using System.Collections.Generic;
using NetTopologySuite.Geometries;

namespace DAL.Contexts
{
    public partial class Transactions
    {
        public Transactions()
        {
            Txns = new HashSet<Txns>();
        }

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
        public  string C11301 { get; set; }
      

        public Geometry Geometry { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual ICollection<Txns> Txns { get; set; }
    }
}
