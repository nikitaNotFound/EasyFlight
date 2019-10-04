using BusinessLayer.Models.Airports;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Airports
{
    public interface IAirportService
    {
        Task<Airport> GetByIdAsync(int id);
        Task<IEnumerable<Airport>> SearchAsync(AirportSearchOptions searchOptions);
        Task<ResultTypes> AddAsync(Airport country);
        Task<ResultTypes> UpdateAsync(int id, Airport city);
    }
}