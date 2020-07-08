using System;
using System.Collections.Generic;

namespace DAL.Contexts
{
    public partial class Txns
    {
        public int Id { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Category { get; set; }
        public string Produce { get; set; }
        public string Breed { get; set; }
        public string BreedGender { get; set; }
        public int? Quantity { get; set; }
        public double Revenue { get; set; }
        public int AmtofMilkdp { get; set; }
        public string Age { get; set; }
       // public string TransactionId { get; set; }
        public string TransactionsId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public virtual Transactions Transactions { get; set; }
    }
}
