﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Airports;
using AirportEntity = DataAccessLayer.Models.AirportEntity;
using AutoMapper;

namespace BusinessLayer.Services.Airports
{
    public class AirportService : IAirportService
    {
        private readonly IAirportRepository _airportRepository;
        private readonly IMapper _mapper;


        public AirportService(IAirportRepository airportRepository, IMapper mapper)
        {
            _airportRepository = airportRepository;
            _mapper = mapper;
        }


        public async Task<IReadOnlyCollection<Airport>> GetAllAsync()
        {
            IReadOnlyCollection<AirportEntity> airportsDal = await _airportRepository.GetAllAsync();

            IReadOnlyCollection<Airport> airports = airportsDal.Select(_mapper.Map<Airport>).ToList();

            return airports;
        }

        public async Task<IReadOnlyCollection<Airport>> SearchByNameAsync(string nameFilter)
        {
            IReadOnlyCollection<AirportEntity> airportsDal = await _airportRepository.SearchByNameAsync(nameFilter);

            IReadOnlyCollection<Airport> airports = airportsDal.Select(_mapper.Map<Airport>).ToList();

            return airports;
        }

        public async Task<AddResult> AddAsync(Airport airport)
        {
            AirportEntity airportDal = _mapper.Map<AirportEntity>(airport);

            bool duplicate = await _airportRepository.CheckDuplicateAsync(airportDal);

            if (duplicate)
            {
                return new AddResult(ResultTypes.Duplicate, null);
            }

            int addedAirportId = await _airportRepository.AddAsync(airportDal);

            return new AddResult(ResultTypes.Ok, addedAirportId);
        }

        public async Task<Airport> GetByIdAsync(int id)
        {
            AirportEntity foundAirport = await _airportRepository.GetByIdAsync(id);

            return _mapper.Map<Airport>(foundAirport);
        }

        public async Task<ResultTypes> UpdateAsync(Airport airport)
        {
            AirportEntity oldAirportDal = await _airportRepository.GetByIdAsync(airport.Id);

            if (oldAirportDal == null)
            {
                return ResultTypes.NotFound;
            }

            AirportEntity airportDal = _mapper.Map<AirportEntity>(airport);

            bool duplicate = await _airportRepository.CheckDuplicateAsync(airportDal);

            if (duplicate)
            {
                return ResultTypes.Duplicate;
            }

            await _airportRepository.UpdateAsync(airportDal);

            return ResultTypes.Ok;
        }
    }
}