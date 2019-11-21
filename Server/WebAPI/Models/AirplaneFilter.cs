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
        public int CurrentPage { get; set; }
        public int PageLimit { get; set; }

        public AirplaneFilter(
            string nameFilter,
            int? minCarryingKg,
            int? maxCarryingKg,
            int? minSeatCount,
            int? maxSeatCount,
            int currentPage,
            int pageLimit
        )
        {
            NameFilter = nameFilter;
            MinCarryingKg = minCarryingKg;
            MaxCarryingKg = maxCarryingKg;
            MinSeatCount = minSeatCount;
            MaxSeatCount = maxSeatCount;
            CurrentPage = currentPage;
            PageLimit = pageLimit;
        }
    }
}
