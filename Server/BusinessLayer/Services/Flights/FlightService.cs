using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Flights;

namespace BusinessLayer.Services.Flights
{
    public class FlightService : IFlightService
    {
        private readonly IMapper _mapper;
        private readonly IFlightRepository _flightRepository;


        public FlightService(IMapper mapper, IFlightRepository flightRepository)
        {
            _mapper = mapper;
            _flightRepository = flightRepository;
        }


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

        public Task<IReadOnlyCollection<FlightSeatTypeCost>> GetFlightSeatTypesCost(int airplaneId)
        {
            throw new System.NotImplementedException();
        }

        public Task<AddResult> AddFlightSeatTypeCostAsync(FlightSeatTypeCost seatTypeCost)
        {
            throw new System.NotImplementedException();
        }

        public Task<ResultTypes> UpdateFlightSeatTypeCostAsync(FlightSeatTypeCost newSeatTypeCost)
        {
            throw new System.NotImplementedException();
        }
    }
}