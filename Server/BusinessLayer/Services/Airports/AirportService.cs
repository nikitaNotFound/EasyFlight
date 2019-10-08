using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer;
using BusinessLayer.Models.Airports;
using DataAccessLayer.Repositories.Airports;
using DalAirport = DataAccessLayer.Models.DataTransfer.Airports.Airport;
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

        public async Task<ResultTypes> AddAsync(Airport airport)
        {
            DalAirport airportDal = _mapper.Map<DalAirport>(airport);

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
            DalAirport foundAirport = await _airportRepository.GetAsync(id);

            return _mapper.Map<Airport>(foundAirport);
        }

        public async Task<ResultTypes> UpdateAsync(int id, Airport airport)
        {
            var oldAirportDal = await _airportRepository.GetAsync(id);

            if (oldAirportDal != null)
            {
                var airportDal = _mapper.Map<DalAirport>(airport);
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