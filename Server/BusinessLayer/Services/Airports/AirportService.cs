using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer;
using BusinessLayer.Models.Airports;
using DataAccessLayer.Repositories.Airports;
using DalAirport = DataAccessLayer.Models.DataTransfer.Airports.Airport;
using DalAirportSearchOptions = DataAccessLayer.Models.DataTransfer.Airports.AirportSearchOptions;
using AutoMapper;

namespace BusinessLayer.Services.Airports
{
    public class AirportService : IAirportService
    {
        private IAirportRepository airportRepository;
        private IMapper mapper;

        public AirportService(IAirportRepository airportRepository, IMapper mapper)
        {
            this.airportRepository = airportRepository;
            this.mapper = mapper;
        }

        public async Task<ResultTypes> AddAsync(Airport airport)
        {
            var airportDal = mapper.Map<DalAirport>(airport);

            bool dublicate = await airportRepository.CheckDublicateAsync(airportDal);

            if (!dublicate)
            {
                await airportRepository.AddAsync(airportDal);
                return ResultTypes.Dublicate;
            }

            return ResultTypes.OK;
        }

        public async Task<Airport> GetByIdAsync(int id)
        {
            DalAirport foundAirport = await airportRepository.GetAsync(id);

            return mapper.Map<Airport>(foundAirport);
        }

        public async Task<IEnumerable<Airport>> SearchAsync(AirportSearchOptions searchOptions)
        {
            var searchOptionsDal = mapper.Map<DalAirportSearchOptions>(searchOptions);

            IEnumerable<DalAirport> foundAirports;
            if (searchOptions.CityId == null)
            {
                foundAirports = await airportRepository.SearchByNameAsync(searchOptionsDal.Name);
            }
            else
            {
                foundAirports = await airportRepository.SearchAsync(searchOptionsDal);
            }

            return foundAirports.Select(mapper.Map<Airport>);
        }

        public async Task<ResultTypes> UpdateAsync(int id, Airport airport)
        {
            var oldAirportDal = await airportRepository.GetAsync(id);

            if (oldAirportDal != null)
            {
                var airportDal = mapper.Map<DalAirport>(airport);
                airportDal.Id = id;

                bool dublicate = await airportRepository.CheckDublicateAsync(airportDal);

                if (!dublicate)
                {
                    await airportRepository.UpdateAsync(airportDal);
                    return ResultTypes.OK;
                }

                return ResultTypes.UpdatingNameExists;
            }

            return ResultTypes.NotFound;
        }
    }
}