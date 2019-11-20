using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Models;
using DataAccessLayer;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Airplanes;
using DataAccessLayer.Repositories.Airports;
using DataAccessLayer.Repositories.Flights;
using Microsoft.AspNetCore.Http;

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


        public async Task<ItemsPage<Flight>> GetAllAsync(int currentPage, int pageLimit)
        {
            ItemsPageEntity<FlightEntity> flightsDal = await _flightRepository.GetAllAsync(currentPage, pageLimit);

            ItemsPage<Flight> flights = _mapper.Map<ItemsPage<Flight>>(flightsDal);

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

            if (flight.ArrivalTime <= flight.DepartureTime)
            {
                return new AddResult(ResultTypes.InvalidData, null);
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

            if (newFlight.ArrivalTime <= newFlight.DepartureTime)
            {
                return ResultTypes.InvalidData;
            }

            await _flightRepository.UpdateAsync(flightDal);

            return ResultTypes.Ok;
        }

        public async Task<ItemsPage<Flight>> SearchFlightsAsync(FlightFilter filter)
        {
            FlightFilterEntity filterDal = _mapper.Map<FlightFilterEntity>(filter);

            if (filter.SearchFlightsBack)
            {
                filterDal.PageLimit = (int) Math.Floor(Convert.ToDecimal(filter.PageLimit / 2));
            }

            ItemsPageEntity<FlightEntity> flightsDal =
                await _flightRepository.SearchFlightsAsync(filterDal);

            if (filter.SearchFlightsBack)
            {
                int? fromCityIdBuff = filterDal.FromCityId;
                filterDal.FromCityId = filterDal.ToCityId;
                filterDal.ToCityId = fromCityIdBuff;

                int? fromAirportIdBuff = filterDal.FromAirportId;
                filterDal.FromAirportId = filterDal.ToAirportId;
                filterDal.ToAirportId = fromAirportIdBuff;

                ItemsPageEntity<FlightEntity> flightsBackDal =
                    await _flightRepository.SearchFlightsAsync(filterDal);

                flightsDal.Content = flightsDal.Content.Concat(flightsBackDal.Content).ToList();
            }

            return _mapper.Map<ItemsPage<Flight>>(flightsDal);
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
                await _airplaneRepository.GetSeatTypeById(seatTypeCostDal.SeatTypeId);

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
                await _airplaneRepository.GetSeatTypeById(seatTypeCostDal.SeatTypeId);

            if (seatType == null)
            {
                return ResultTypes.NotFound;
            }

            await _flightRepository.UpdateFlightSeatTypeCostAsync(seatTypeCostDal);

            return ResultTypes.Ok;
        }
    }
}