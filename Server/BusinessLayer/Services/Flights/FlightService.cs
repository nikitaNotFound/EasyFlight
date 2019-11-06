using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Models;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Airplanes;
using DataAccessLayer.Repositories.Airports;
using DataAccessLayer.Repositories.Flights;

namespace BusinessLayer.Services.Flights
{
    public class FlightService : IFlightService
    {
        private readonly IMapper _mapper;
        private readonly IFlightRepository _flightRepository;
        private readonly IAirportRepository _airportRepository;
        private readonly IAirplaneRepository _airplaneRepository;


        public FlightService(
            IMapper mapper,
            IFlightRepository flightRepository,
            IAirportRepository airportRepository,
            IAirplaneRepository airplaneRepository
        )
        {
            _mapper = mapper;
            _flightRepository = flightRepository;
            _airportRepository = airportRepository;
            _airplaneRepository = airplaneRepository;
        }


        public async Task<IReadOnlyCollection<Flight>> GetAllAsync()
        {
            IReadOnlyCollection<FlightEntity> flightsDal = await _flightRepository.GetAllAsync();

            IReadOnlyCollection<Flight> flights = flightsDal.Select(_mapper.Map<Flight>).ToList();

            return flights;
        }

        public async Task<Flight> GetByIdAsync(int id)
        {
            FlightEntity flightDal = await _flightRepository.GetByIdAsync(id);

            Flight flight = _mapper.Map<Flight>(flightDal);

            return flight;
        }

        public async Task<AddResult> AddAsync(Flight flight)
        {
            FlightEntity flightDal = _mapper.Map<FlightEntity>(flight);

            AirportEntity toAirport = await _airportRepository.GetByIdAsync(flightDal.ToAirportId);
            AirportEntity fromAirport = await _airportRepository.GetByIdAsync(flightDal.FromAirportId);

            if (toAirport == null || fromAirport == null)
            {
                return new AddResult(ResultTypes.NotFound, null);
            }

            AirplaneEntity airplane = await _airplaneRepository.GetByIdAsync(flightDal.AirplaneId);

            if (airplane == null)
            {
                return new AddResult(ResultTypes.NotFound, null);
            }

            int addedFlightId = await _flightRepository.AddAsync(flightDal);

            return new AddResult(ResultTypes.Ok, addedFlightId);
        }

        public async Task<ResultTypes> UpdateAsync(Flight newFlight)
        {
            FlightEntity flightDal = _mapper.Map<FlightEntity>(newFlight);

            AirportEntity toAirport = await _airportRepository.GetByIdAsync(flightDal.ToAirportId);
            AirportEntity fromAirport = await _airportRepository.GetByIdAsync(flightDal.FromAirportId);

            if (toAirport == null || fromAirport == null)
            {
                return ResultTypes.NotFound;
            }

            AirplaneEntity airplane = await _airplaneRepository.GetByIdAsync(flightDal.AirplaneId);

            if (airplane == null)
            {
                return ResultTypes.NotFound;
            }

            await _flightRepository.UpdateAsync(flightDal);

            return ResultTypes.Ok;
        }

        public async Task<IReadOnlyCollection<Flight>> SearchFlightsAsync(FlightFilter filter)
        {
            FlightFilterEntity filterDal = _mapper.Map<FlightFilterEntity>(filter);

            IReadOnlyCollection<FlightEntity> flightsDal = await _flightRepository.SearchFlightsAsync(filterDal);

            return flightsDal.Select(_mapper.Map<Flight>).ToList();
        }

        public async Task<IReadOnlyCollection<FlightSeatTypeCost>> GetFlightSeatTypesCost(int flightId)
        {
            IReadOnlyCollection<FlightSeatTypeCostEntity> flightsDal =
                await _flightRepository.GetFlightSeatTypesCostAsync(flightId);

            return flightsDal.Select(_mapper.Map<FlightSeatTypeCost>).ToList();
        }

        public async Task<ResultTypes> AddFlightSeatTypeCostAsync(FlightSeatTypeCost seatTypeCost)
        {
            FlightSeatTypeCostEntity seatTypeCostDal = _mapper.Map<FlightSeatTypeCostEntity>(seatTypeCost);

            FlightEntity flight = await _flightRepository.GetByIdAsync(seatTypeCostDal.FlightId);

            if (flight == null)
            {
                return ResultTypes.NotFound;
            }

            AirplaneSeatTypeEntity seatType =
                await _airplaneRepository.GetAirplaneSeatTypeById(seatTypeCostDal.SeatTypeId);

            if (seatType == null)
            {
                return ResultTypes.NotFound;
            }

            bool duplicate = await _flightRepository.CheckFlightSeatTypeCostDuplicateAsync(seatTypeCostDal);

            if (duplicate)
            {
                return ResultTypes.Duplicate;
            }

            await _flightRepository.AddFlightSeatTypeCostAsync(seatTypeCostDal);

            return ResultTypes.Ok;
        }

        public async Task<ResultTypes> UpdateFlightSeatTypeCostAsync(FlightSeatTypeCost newSeatTypeCost)
        {
            FlightSeatTypeCostEntity seatTypeCostDal = _mapper.Map<FlightSeatTypeCostEntity>(newSeatTypeCost);

            FlightEntity flight = await _flightRepository.GetByIdAsync(seatTypeCostDal.FlightId);

            if (flight == null)
            {
                return ResultTypes.NotFound;
            }

            AirplaneSeatTypeEntity seatType =
                await _airplaneRepository.GetAirplaneSeatTypeById(seatTypeCostDal.SeatTypeId);

            if (seatType == null)
            {
                return ResultTypes.NotFound;
            }

            await _flightRepository.UpdateFlightSeatTypeCostAsync(seatTypeCostDal);

            return ResultTypes.Ok;
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