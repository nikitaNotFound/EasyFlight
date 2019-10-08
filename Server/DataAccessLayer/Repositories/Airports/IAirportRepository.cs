using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models.DataTransfer.Airports;

namespace DataAccessLayer.Repositories.Airports
{
    public interface IAirportRepository
    {
        Task<Airport> GetAsync(int id);
        Task<IEnumerable<Airport>> SearchByNameAsync(string name);
        Task AddAsync(Airport item);
        Task UpdateAsync(Airport item);
        Task<bool> CheckDublicateAsync(Airport item);
    }
}
