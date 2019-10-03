using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models.Entities.Cities
{
    internal class CitySearchOptions
    {
        public string Name { get; set; }
        public int CountryId { get; set; }
    }
}