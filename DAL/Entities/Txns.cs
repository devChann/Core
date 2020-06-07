﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public double Revenue { get; set; }
        public int AmtofMilkdp { get; set; }
        public string Age { get; set; }
        [ForeignKey("TransactionId")]
        [MaxLength(36)]
        public char TransactionId { get; set; }
    }
}
