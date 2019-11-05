using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Flights
{
    public class FlightRepository : IFlightRepository
    {
        public Task<IReadOnlyCollection<FlightEntity>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<FlightEntity> GetByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> AddAsync(FlightEntity flight)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateAsync(FlightEntity newFlight)
        {
            throw new System.NotImplementedException();
        }

        public Task<IReadOnlyCollection<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter)
        {
            throw new System.NotImplementedException();
        }
    }
}