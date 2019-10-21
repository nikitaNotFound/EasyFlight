using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Models
{
    public class AirplaneFilter
    {
        public string NameFilter { get; set; }
        public int? MinCarryingKg { get; set; }
        public int? MaxCarryingKg { get; set; }
        public int? MinSeatCount { get; set; }
        public int? MaxSeatCount { get; set; }
    }
}
