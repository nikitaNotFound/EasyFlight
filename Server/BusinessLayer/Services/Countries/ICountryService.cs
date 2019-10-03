using EasyFlight.Models.Countries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Services.Countries
{
    public interface ICountryService
    {
        Task<Country> GetByIdAsync(int id);
        Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions);
        Task AddAsync(Country country);
        Task UpdateAsync(int id, Country country);
    }
}