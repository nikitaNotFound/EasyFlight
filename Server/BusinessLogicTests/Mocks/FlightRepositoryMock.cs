using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Flights;

namespace BusinessLogicTests.Mocks
{
    public class FlightRepositoryMock : IFlightRepository
    {
        private readonly List<FlightEntity> _flightData = new List<FlightEntity>()
        {
            new FlightEntity()
            {
                Id = 1,
                FromAirportId = 1,
                ToAirportId = 2,
                DepartureTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 16, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                ArrivalTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 17, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                AirplaneId = 1,
                SuitcaseMassKg = 15,
                SuitcaseCount = 1,
                HandLuggageMassKg = 5,
                HandLuggageCount = 1,
                MassOverloadKgCost = 10
            },
            new FlightEntity()
            {
                Id = 2,
                FromAirportId = 1,
                ToAirportId = 3,
                DepartureTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 16, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                ArrivalTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 20, 0, 0),
                    new TimeSpan(1, 0, 0)
                ),
                AirplaneId = 1,
                SuitcaseMassKg = 15,
                SuitcaseCount = 1,
                HandLuggageMassKg = 5,
                HandLuggageCount = 1,
                MassOverloadKgCost = 10
            }
        };

        public async Task<IReadOnlyCollection<FlightEntity>> GetAllAsync()
        {
            return _flightData;
        }

        public async Task<FlightEntity> GetByIdAsync(int id)
        {
            return _flightData.FirstOrDefault(x => x.Id == id);
        }

        public async Task<int> AddAsync(FlightEntity flight)
        {
            return 0;
        }

        public async Task UpdateAsync(FlightEntity newFlight)
        {
            // implementation
        }

        public async Task<IReadOnlyCollection<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter)
        {
            return _flightData;
        }
    }
}