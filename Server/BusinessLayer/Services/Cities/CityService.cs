using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Cities;
using AutoMapper;
using System.Linq;

namespace BusinessLayer.Services.Cities
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;


        public CityService(ICityRepository cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }


        public async Task<IReadOnlyCollection<City>> GetAllAsync()
        {
            IReadOnlyCollection<CityEntity> citiesDal = await _cityRepository.GetAllAsync();

            IReadOnlyCollection<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return cities;
        }

        public async Task<IReadOnlyCollection<City>> SearchByNameAsync(string nameFilter)
        {
            IReadOnlyCollection<CityEntity> citiesDal = await _cityRepository.SearchByNameAsync(nameFilter);

            IReadOnlyCollection<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return cities;
        }

        public async Task<City> GetByIdAsync(int id)
        {
            CityEntity foundCityDal = await _cityRepository.GetAsync(id);

            City foundCity = _mapper.Map<City>(foundCityDal);

            return foundCity;
        }

        public async Task<ServiceAddResult> AddAsync(City city)
        {
            CityEntity cityDal = _mapper.Map<CityEntity>(city);

            bool duplicate = await _cityRepository.CheckDuplicateAsync(cityDal);

            if (duplicate)
            {
                return new ServiceAddResult(ResultTypes.Duplicate, null);
                
            }

            int addedCityId = await _cityRepository.AddAsync(cityDal);

            return new ServiceAddResult(ResultTypes.Ok, addedCityId);
        }

        public async Task<ResultTypes> UpdateAsync(City city)
        {
            CityEntity oldCityDal = await _cityRepository.GetAsync(city.Id);

            if (oldCityDal == null)
            {
                return ResultTypes.NotFound;
            }

            CityEntity cityDal = _mapper.Map<CityEntity>(city);

            bool duplicate = await _cityRepository.CheckDuplicateAsync(cityDal);

            if (duplicate)
            {
                return ResultTypes.Duplicate;
            }
            
            await _cityRepository.UpdateAsync(cityDal);
            return ResultTypes.Ok;
        }

        public async Task<IReadOnlyCollection<Airport>> GetCityAirportsAsync(int cityId)
        {
            IReadOnlyCollection<AirportEntity> airportsDal = await _cityRepository.GetCityAirportsAsync(cityId);

            IReadOnlyCollection<Airport> airports = airportsDal.Select(_mapper.Map<Airport>).ToList();

            return airports;
        }

        public async Task<IReadOnlyCollection<Airport>> SearchCityAirportsByName(int cityId, string nameFilter)
        {
            IReadOnlyCollection<AirportEntity> airportsDal =
                await _cityRepository.SearchCityAirportsByNameAsync(cityId, nameFilter);

            IReadOnlyCollection<Airport> airports = airportsDal.Select(_mapper.Map<Airport>).ToList();

            return airports;
        }
    }
}