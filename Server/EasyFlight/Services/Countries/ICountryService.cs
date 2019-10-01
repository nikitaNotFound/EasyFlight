using EasyFlight.Models.Countries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Services.Countries
{
    public interface ICountryService
    {
        Task<Country> GetById(int id);
        Task<IEnumerable<Country>> Search(CountrySearchOptions searchOptions);
        Task Add(Country country);
        Task Update(int id, Country country);
    }
}