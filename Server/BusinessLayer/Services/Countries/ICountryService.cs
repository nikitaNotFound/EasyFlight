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
        Task<IReadOnlyCollection<Country>> GetByNameAsync(string name);
        Task<IReadOnlyCollection<City>> GetCitiesAsync(int id);
        Task<IReadOnlyCollection<City>> GetCitiesByNameAsync(int id, string name);
        Task<ResultTypes> AddAsync(Country country);
        Task<ResultTypes> UpdateAsync(Country country);
    }
}