using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using EasyFlight.Models.Airports;
using Dapper;
using System.Data;

namespace EasyFlight.Repositories.Airports
{
    public class AirportRepository : IAirportRepository
    {
        Settings settings = null;
        public AirportRepository(Settings settings)
        {
            this.settings = settings;
        }

        public async Task AddAsync(Airport item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            await db.ExecuteAsync(
                "AddAirport",
                new { name = item.Name, cityId = item.CityId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(Airport item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckAirportDublicate",
                new { name = item.Name, cityId = item.CityId},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<Airport> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<Airport>(
                "GetAirportById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Airport>> SearchAsync(AirportSearchOptions searchOptions)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.QueryAsync<Airport>(
                "SearchAirports",
                searchOptions,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Airport>> SearchByNameAsync(string name)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.QueryAsync<Airport>(
                "SearchAirportsByName",
                new { name = name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(Airport item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateAirport",
                new { id = item.Id, name = item.Name, cityId = item.CityId },
                commandType: CommandType.StoredProcedure);
        }
    }
}