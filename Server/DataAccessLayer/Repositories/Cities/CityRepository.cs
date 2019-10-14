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
                "getAllCities",
                null,
                commandType: CommandType.StoredProcedure);

            return cities.ToList();
        }

        public async Task<IReadOnlyCollection<CityEntity>> SearchByNameAsync(string nameFilter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<CityEntity> cities = await db.QueryAsync<CityEntity>(
                "searchCitiesByName",
                new { nameFilter = nameFilter },
                commandType: CommandType.StoredProcedure);

            return cities.ToList();
        }

        public async Task<CityEntity> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<CityEntity>(
                "getCityById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "addCity",
                new { name = city.Name, countryId = city.CountryId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "updateCity",
                city,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(CityEntity city)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "checkCityDublicate",
                new { name = city.Name, countryId = city.CountryId },
                commandType: CommandType.StoredProcedure);
        }
    }
}