using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using DataAccessLayer.Models;
using System.Linq;

namespace DataAccessLayer.Repositories.Cities
{
    public class CityRepository : ICityRepository
    {
        private readonly IDalSettings _dalSettings;


        public CityRepository(IDalSettings settings)
        {
            _dalSettings = settings;
        }


        public async Task<IReadOnlyCollection<CityEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<CityEntity> cities = await db.QueryAsync<CityEntity>(
                "GetAllCities",
                null,
                commandType: CommandType.StoredProcedure);

            return cities.ToList();
        }

        public async Task<IReadOnlyCollection<CityEntity>> SearchByNameAsync(string nameFilter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<CityEntity> cities = await db.QueryAsync<CityEntity>(
                "SearchCitiesByName",
                new { nameFilter = nameFilter },
                commandType: CommandType.StoredProcedure);

            return cities.ToList();
        }

        public async Task<CityEntity> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<CityEntity>(
                "GetCityById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirportEntity>> GetCityAirportsAsync(int cityId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirportEntity> airports = await db.QueryAsync<AirportEntity>(
                "GetCityAirports",
                new { cityId = cityId },
                commandType: CommandType.StoredProcedure);

            return airports.ToList();
        }

        public async Task<IReadOnlyCollection<AirportEntity>> SearchCityAirportsByNameAsync(
            int cityId,
            string nameFilter
        )
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirportEntity> airports = await db.QueryAsync<AirportEntity>(
                "SearchCityAirportsByName",
                new { cityId = cityId, nameFilter = nameFilter },
                commandType: CommandType.StoredProcedure);

            return airports.ToList();
        }

        public async Task<CityEntity> AddAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<CityEntity>(
                "AddCity",
                new { name = city.Name, countryId = city.CountryId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateCity",
                city,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDuplicateAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCityDuplicate",
                new { name = city.Name, countryId = city.CountryId },
                commandType: CommandType.StoredProcedure);
        }
    }
}