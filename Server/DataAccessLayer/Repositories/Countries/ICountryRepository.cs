using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models.Countries;

namespace DataAccessLayer.Repositories.Countries
{
    public interface ICountryRepository
    {
        Task<CountryEntity> GetAsync(int id);
        Task<IEnumerable<CountryEntity>> SearchAsync(CountrySearchOptionsEntity searchOptions);
        Task AddAsync(CountryEntity country);
        Task UpdateAsync(CountryEntity country);
        Task<bool> CheckDublicateAsync(CountryEntity country);
    }
}