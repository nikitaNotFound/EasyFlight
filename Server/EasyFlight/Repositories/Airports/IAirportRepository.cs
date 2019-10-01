using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyFlight.Models.Airports;

namespace EasyFlight.Repositories.Airports
{
    public interface IAirportRepository
    {
        Task<Airport> GetAsync(int id);
        Task<IEnumerable<Airport>> SearchAsync(AirportSearchOptions searchOptions);
        Task<IEnumerable<Airport>> SearchByNameAsync(string name);
        Task AddAsync(Airport item);
        Task UpdateAsync(Airport item);
        Task<bool> CheckDublicateAsync(Airport item);
    }
}
