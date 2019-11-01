using System.Collections.Generic;
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

        public async Task<IReadOnlyCollection<Airport>> GetByNameAsync(string nameFilter)
        {
            IReadOnlyCollection<AirportEntity> airportsDal = await _airportRepository.GetByNameAsync(nameFilter);

            IReadOnlyCollection<Airport> airports = airportsDal.Select(_mapper.Map<Airport>).ToList();

            return airports;
        }

        public async Task<ServiceResult<Airport>> AddAsync(Airport airport)
        {
            AirportEntity airportDal = _mapper.Map<AirportEntity>(airport);

            bool duplicate = await _airportRepository.CheckDuplicateAsync(airportDal);

            if (duplicate)
            {
                return new ServiceResult<Airport>(ResultTypes.Duplicate, null);
            }

            AirportEntity addedAirportDal = await _airportRepository.AddAsync(airportDal);

            Airport addedAirport = _mapper.Map<Airport>(addedAirportDal);
            
            return new ServiceResult<Airport>(ResultTypes.Ok, addedAirport);
        }

        public async Task<Airport> GetByIdAsync(int id)
        {
            AirportEntity foundAirport = await _airportRepository.GetAsync(id);

            return _mapper.Map<Airport>(foundAirport);
        }

        public async Task<ResultTypes> UpdateAsync(Airport airport)
        {
            AirportEntity oldAirportDal = await _airportRepository.GetAsync(airport.Id);

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