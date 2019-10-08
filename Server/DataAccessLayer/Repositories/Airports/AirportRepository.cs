using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models.DataTransfer.Airports;
using DataAccessLayer.Models.Entities.Airports;
using Dapper;
using System.Data;
using AutoMapper;

namespace DataAccessLayer.Repositories.Airports
{
    public class AirportRepository : IAirportRepository
    {
        private IDalSettings settings;
        private IMapper mapper;

        public AirportRepository(IDalSettings settings, IMapper mapper)
        {
            this.settings = settings;
            this.mapper = mapper;
        }

        public async Task AddAsync(Airport airport)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            AirportEntity airportEntity = mapper.Map<AirportEntity>(airport);

            await db.ExecuteAsync(
                "AddAirport",
                new { name = airportEntity.Name, cityId = airportEntity.CityId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(Airport airport)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            AirportEntity airportEntity = mapper.Map<AirportEntity>(airport);

            return await db.ExecuteScalarAsync<bool>(
                "CheckAirportDublicate",
                new { name = airportEntity.Name, cityId = airportEntity.CityId},
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

        public async Task<IEnumerable<Airport>> SearchByNameAsync(string name)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.QueryAsync<Airport>(
                "SearchAirportsByName",
                new { name = name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(Airport airport)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var AirportEntity = mapper.Map<AirportEntity>(airport);

            await db.ExecuteAsync(
                "UpdateAirport",
                new { id = airportDal.Id, name = airportDal.Name, cityId = airportDal.CityId },
                commandType: CommandType.StoredProcedure);
        }
    }
}