using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer;
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

            IEnumerable<Airport> airports = airportsDal.Select(_mapper.Map<Airport>).ToList();

            return (IReadOnlyCollection<Airport>) airports;
        }

        public async Task<IReadOnlyCollection<Airport>> GetByNameAsync(string name)
        {
            IReadOnlyCollection<AirportEntity> airportsDal = await _airportRepository.GetByNameAsync(name);

            IEnumerable<Airport> airports = airportsDal.Select(_mapper.Map<Airport>).ToList();

            return (IReadOnlyCollection<Airport>) airports;
        }

        public async Task<ResultTypes> AddAsync(Airport airport)
        {
            AirportEntity airportDal = _mapper.Map<AirportEntity>(airport);

            bool dublicate = await _airportRepository.CheckDublicateAsync(airportDal);

            if (!dublicate)
            {
                await _airportRepository.AddAsync(airportDal);
                return ResultTypes.Dublicate;
            }

            return ResultTypes.OK;
        }

        public async Task<Airport> GetByIdAsync(int id)
        {
            AirportEntity foundAirport = await _airportRepository.GetAsync(id);

            return _mapper.Map<Airport>(foundAirport);
        }

        public async Task<ResultTypes> UpdateAsync(Airport airport)
        {
            var oldAirportDal = await _airportRepository.GetAsync(airport.Id);

            if (oldAirportDal != null)
            {
                var airportDal = _mapper.Map<AirportEntity>(airport);

                bool dublicate = await _airportRepository.CheckDublicateAsync(airportDal);

                if (!dublicate)
                {
                    await _airportRepository.UpdateAsync(airportDal);
                    return ResultTypes.OK;
                }

                return ResultTypes.Dublicate;
            }

            return ResultTypes.NotFound;
        }
    }
}