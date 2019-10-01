using EasyFlight.Models.Airports;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IAirportService
{
    Task<Airport> GetById(int id);
    Task<IEnumerable<Airport>> Search(AirportSearchOptions searchOptions);
    Task Add(Airport country);
    Task Update(int id, Airport city);
}