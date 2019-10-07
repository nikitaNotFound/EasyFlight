using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
namespace DataAccessLayer.Repositories.Countries
{
    public interface ICountryRepository
    {
        Task<IEnumerable<CountryEntity>> GetAllAsync();
        Task<CountryEntity> GetAsync(int id);
        Task<IEnumerable<CountryEntity>> GetByNameAsync(string name);
        Task<IEnumerable<CityEntity>> GetCitiesAsync(int id);
        Task<IEnumerable<CityEntity>> GetCitiesByNameAsync(int id, string name);
        Task AddAsync(CountryEntity country);
        Task UpdateAsync(CountryEntity country);
        Task<bool> CheckDublicateAsync(CountryEntity country);
    }
}