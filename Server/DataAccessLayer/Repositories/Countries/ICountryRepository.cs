using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models.DataTransfer.Countries;

namespace DataAccessLayer.Repositories.Countries
{
    public interface ICountryRepository
    {
        Task<Country> GetAsync(int id);
        Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions);
        Task AddAsync(Country item);
        Task UpdateAsync(Country item);
        Task<bool> CheckDublicateAsync(Country item);
    }
}