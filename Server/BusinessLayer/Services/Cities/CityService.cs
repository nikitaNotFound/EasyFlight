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
    internal class CityRepository : ICityRepository
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

        public async Task UpdateAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateCity",
                city,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCityDublicate",
                new { name = city.Name, countryId = city.CountryId },
                commandType: CommandType.StoredProcedure);
        }
    }
}