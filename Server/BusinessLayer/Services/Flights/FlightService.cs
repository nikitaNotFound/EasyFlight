using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Flights
{
    public class FlightService : IFlightService
    {
        public Task<IReadOnlyCollection<Flight>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<Flight> GetByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<AddResult> AddAsync(Flight flight)
        {
            throw new System.NotImplementedException();
        }

        public Task<ResultTypes> UpdateAsync(Flight newFlight)
        {
            throw new System.NotImplementedException();
        }

        public Task<IReadOnlyCollection<Flight>> SearchFlightsAsync(FlightFilter filter)
        {
            throw new System.NotImplementedException();
        }
    }
}