using BusinessLayer.Models.Countries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Countries
{
    public interface ICountryService
    {
        Task<IEnumerable<Country>> GetAllAsync();
        Task<Country> GetByIdAsync(int id);
        Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions);
        Task<ResultTypes> AddAsync(Country country);
        Task<ResultTypes> UpdateAsync(Country country);
    }
}