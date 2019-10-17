using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
namespace DataAccessLayer.Repositories.Countries
{
    public interface ICountryRepository
    {
        Task<IReadOnlyCollection<CountryEntity>> GetAllAsync();
        Task<CountryEntity> GetAsync(int id);
        Task<IReadOnlyCollection<CountryEntity>> SearchByNameAsync(string name);
        Task<IReadOnlyCollection<CityEntity>> GetCountryCitiesAsync(int countryId);
        Task<IReadOnlyCollection<CityEntity>> SearchCountryCitiesByNameAsync(int countryId, string name);
        Task AddAsync(CountryEntity country);
        Task UpdateAsync(CountryEntity country);
        Task<bool> CheckDublicateAsync(CountryEntity country);
    }
}