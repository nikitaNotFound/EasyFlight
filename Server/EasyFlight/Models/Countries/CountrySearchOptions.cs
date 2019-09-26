using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Models.Countries
{
    public class CountrySearchOptions
    {
        public CountrySearchOptions(string name)
        {
            this.Name = name;
        }

        public string Name { get; set; }
    }
}