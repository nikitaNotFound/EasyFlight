using System;
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
        private readonly IDalSettings _settings;

        public AirportRepository(IDalSettings settings)
        {
            _settings = settings;
        }

        public async Task AddAsync(AirportEntity airport)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            await db.ExecuteAsync(
                "AddAirport",
                new { name = airport.Name, cityId = airport.CityId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(AirportEntity airport)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckAirportDublicate",
                new { name = airport.Name, cityId = airport.CityId},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirportEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return (IReadOnlyCollection<AirportEntity>) await db.QueryAsync<AirportEntity>(
                "GetAllAirports",
                null,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AirportEntity> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AirportEntity>(
                "GetAirportById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirportEntity>> GetByNameAsync(string name)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return (IReadOnlyCollection<AirportEntity>) await db.QueryAsync<AirportEntity>(
                "SearchAirportsByName",
                new { name = name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(AirportEntity airport)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateAirport",
                new { id = airport.Id, name = airport.Name, cityId = airport.CityId },
                commandType: CommandType.StoredProcedure);
        }
    }
}