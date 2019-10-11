using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using DataAccessLayer.Models;
using AutoMapper;
using System.Linq;

namespace DataAccessLayer.Repositories.Cities
{
    public class CityService : ICityService
    {
        private readonly IDalSettings _settings;


        public CityRepository(IDalSettings settings)
        {
            _settings = settings;
        }


        public async Task<IReadOnlyCollection<CityEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            IReadOnlyCollection<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return cities;
        }

        public async Task<IReadOnlyCollection<City>> SearchByNameAsync(string nameFilter)
        {
            IReadOnlyCollection<CityEntity> citiesDal = await _cityRepository.SearchByNameAsync(nameFilter);

            IReadOnlyCollection<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return cities;
        }

        public async Task<CityEntity> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<CityEntity>(
                "GetCityById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<Airport>> GetCityAirportsAsync(int cityId)
        {
            CityEntity cityDal = _mapper.Map<CityEntity>(city);

            bool duplicate = await _cityRepository.CheckDuplicateAsync(cityDal);

            if (duplicate)
            {
                return ResultTypes.Duplicate;
            }

            await _cityRepository.AddAsync(cityDal);
            return ResultTypes.Ok;
        }

        public async Task UpdateAsync(CityEntity city)
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