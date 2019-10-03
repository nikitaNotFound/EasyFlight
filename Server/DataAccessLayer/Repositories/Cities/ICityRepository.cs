using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models.Entities.Cities;

namespace DataAccessLayer.Repositories.Cities
{
    internal interface ICityRepository
    {
        Task<City> GetAsync(int id);
        Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions);
        Task AddAsync(City item);
        Task UpdateAsync(City item);
        Task<bool> CheckDublicateAsync(City item);
    }
}