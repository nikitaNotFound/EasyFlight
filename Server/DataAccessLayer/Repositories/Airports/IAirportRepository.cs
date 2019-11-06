using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Airports
{
    public interface IAirportRepository
    {
        Task<IReadOnlyCollection<AirportEntity>> GetAllAsync();
        Task<AirportEntity> GetAsync(int id);
        Task<IReadOnlyCollection<AirportEntity>> GetByNameAsync(string nameFilter);
        Task<int> AddAsync(AirportEntity item);
        Task UpdateAsync(AirportEntity item);
        Task<bool> CheckDuplicateAsync(AirportEntity item);
    }
}
