using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class Txns
    {
        
        public int Id { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Category { get; set; }
        public string Produce { get; set; }
        public string Breed { get; set; }
        public string BreedGender { get; set; }
        public int? Quantity { get; set; }
        public string Age { get; set; }
    }
}
