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
                new { name = nameFilter },
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

        public async Task AddAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
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

        public async Task<bool> CheckDublicateAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCityDublicate",
                new { name = city.Name, countryId = city.CountryId },
                commandType: CommandType.StoredProcedure);
        }
    }
}