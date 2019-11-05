using BusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Countries
{
    public interface ICountryService
    {
        Task<IReadOnlyCollection<Country>> GetAllAsync();
        Task<Country> GetByIdAsync(int id);
        Task<IReadOnlyCollection<Country>> SearchByNameAsync(string name);
        Task<IReadOnlyCollection<City>> GetCountryCitiesAsync(int countryId);
        Task<IReadOnlyCollection<City>> SearchCountryCitiesByNameAsync(int countryId, string name);
        Task<AddResult> AddAsync(Country country);
        Task<ResultTypes> UpdateAsync(Country country);
    }
}