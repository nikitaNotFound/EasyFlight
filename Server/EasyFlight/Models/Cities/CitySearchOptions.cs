﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.Cities
{
    public class CitySearchOptions
    {
        public string Name { get; set; }
        public int CountryId { get; set; }
    }
}