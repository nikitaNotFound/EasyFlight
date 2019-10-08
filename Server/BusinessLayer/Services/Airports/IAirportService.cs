using BusinessLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Airports
{
    public interface IAirportService
    {
        Task<IEnumerable<Airport>> GetAllAsync();
        Task<Airport> GetByIdAsync(int id);
        Task<ResultTypes> AddAsync(Airport country);
        Task<ResultTypes> UpdateAsync(int id, Airport city);
    }
}