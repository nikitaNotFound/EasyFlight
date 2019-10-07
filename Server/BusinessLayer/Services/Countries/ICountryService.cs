using BusinessLayer.Models;
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
        Task<IEnumerable<Country>> GetByNameAsync(string name);
        Task<IEnumerable<City>> GetCitiesAsync(int id);
        Task<IEnumerable<City>> GetCitiesByNameAsync(int id, string name);
        Task<ResultTypes> AddAsync(Country country);
        Task<ResultTypes> UpdateAsync(Country country);
    }
}