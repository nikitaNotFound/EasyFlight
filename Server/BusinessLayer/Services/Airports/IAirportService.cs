using BusinessLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Airports
{
    public interface IAirportService
    {
        Task<IReadOnlyCollection<Airport>> GetAllAsync();
        Task<IReadOnlyCollection<Airport>> GetByNameAsync(string nameFilter);
        Task<Airport> GetByIdAsync(int id);
        Task<AddResult> AddAsync(Airport country);
        Task<ResultTypes> UpdateAsync(Airport city);
    }
}