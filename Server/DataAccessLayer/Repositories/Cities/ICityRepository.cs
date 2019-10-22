using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Cities
{
    public interface ICityRepository
    {
        Task<IReadOnlyCollection<CityEntity>> GetAllAsync();
        Task<IReadOnlyCollection<CityEntity>> SearchByNameAsync(string name);
        Task<CityEntity> GetAsync(int id);
        Task AddAsync(CityEntity city);
        Task UpdateAsync(CityEntity city);
        Task<bool> CheckDuplicateAsync(CityEntity city);
    }
}