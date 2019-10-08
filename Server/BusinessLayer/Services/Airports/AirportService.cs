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
        private IAirportRepository _airportRepository;
        private IMapper _mapper;

        public AirportService(IAirportRepository airportRepository, IMapper mapper)
        {
            _airportRepository = airportRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Airport>> GetAllAsync()
        {
            IEnumerable<AirportEntity> airportsDal = await _airportRepository.GetAllAsync();

            IEnumerable<Airport> airports = airportsDal.Select(_mapper.Map<Airport>);

            return airports;
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

        public async Task<ResultTypes> UpdateAsync(int id, Airport airport)
        {
            var oldAirportDal = await _airportRepository.GetAsync(id);

            if (oldAirportDal != null)
            {
                var airportDal = _mapper.Map<AirportEntity>(airport);
                airportDal.Id = id;

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