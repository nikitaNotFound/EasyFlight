using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using EasyFlight.Models.Cities;
using System.Data.SqlClient;
using System.Data;

namespace EasyFlight.Repositories.Cities
{
    public class CityRepository : ICityRepository
    {
        Settings settings;
        public CityRepository(Settings settings)
        {
            this.settings = settings;
        }

        public async Task<City> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<City>(
                "GetCityById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.QueryAsync<City>(
                "SeatchCities",
                searchOptions,
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddAsync(City item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            await db.ExecuteAsync(
                "AddCity",
                new { name = item.Name, countryId = item.CountryId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(City item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateCity",
                item,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(City item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCityDublicate",
                new { name = item.Name, countryId = item.CountryId },
                commandType: CommandType.StoredProcedure);
        }
    }
}