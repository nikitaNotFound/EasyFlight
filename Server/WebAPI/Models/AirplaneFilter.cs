using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
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
