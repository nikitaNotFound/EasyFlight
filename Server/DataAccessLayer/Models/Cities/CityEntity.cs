using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models.Cities
{
    public class CityEntity
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
    }
}