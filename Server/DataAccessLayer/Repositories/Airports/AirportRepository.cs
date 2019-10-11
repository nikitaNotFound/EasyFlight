using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using Dapper;
using System.Data;

namespace DataAccessLayer.Repositories.Airports
{
    public class AirportRepository : IAirportRepository
    {
        private readonly IDalSettings _dalSettings;



        public AirportRepository(IDalSettings settings)
        {
            _dalSettings = settings;
        }


        public async Task AddAsync(AirportEntity airport)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "AddAirport",
                new { name = airport.Name, cityId = airport.CityId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDuplicateAsync(AirportEntity airport)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckAirportDuplicate",
                new { name = airport.Name, cityId = airport.CityId},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirportEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirportEntity> airports = await db.QueryAsync<AirportEntity>(
                "GetAllAirports",
                null,
                commandType: CommandType.StoredProcedure);

            return airports.ToList();
        }

        public async Task<AirportEntity> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AirportEntity>(
                "GetAirportById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirportEntity>> GetByNameAsync(string nameFilter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirportEntity> airports = await db.QueryAsync<AirportEntity>(
                "SearchAirportsByName",
                new { name = nameFilter },
                commandType: CommandType.StoredProcedure);

            return airports.ToList();
        }

        public async Task UpdateAsync(AirportEntity airport)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateAirport",
                new { id = airport.Id, name = airport.Name, cityId = airport.CityId },
                commandType: CommandType.StoredProcedure);
        }
    }
}