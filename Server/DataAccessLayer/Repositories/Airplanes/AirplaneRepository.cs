using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Airplanes
{
    class AirplaneRepository : IAirplaneRepository
    {
        private readonly IDalSettings _dalSettings;


        public AirplaneRepository(IDalSettings dalSettings)
        {
            _dalSettings = dalSettings;
        }


        public async Task AddAirplaneSeatAsync(AirplaneSeatEntity seat)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "AddAirplaneSeat",
                new
                {
                    airplaneId = seat.AirplaneId,
                    floor = seat.Floor,
                    section = seat.Section,
                    zone = seat.Zone,
                    row = seat.Row,
                    number = seat.Number,
                    typeId = seat.TypeId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddAirplaneSeatTypeAsync(AirplaneSeatTypeEntity seatType)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "AddAirplaneSeatType",
                new {airplaneId = seatType.AirplaneId, name = seatType.Name, color = seatType.Color},
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddAsync(AirplaneEntity airplane)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "AddAirplane",
                new {name = airplane.Name, carryingKg = airplane.CarryingKg},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirplaneSeatEntity>> GetAirplaneSeatsAsync(int airplaneId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirplaneSeatEntity> seats = await db.QueryAsync<AirplaneSeatEntity>(
                "GetAirplaneSeats",
                new { AirplaneId = airplaneId },
                commandType: CommandType.StoredProcedure);

            return seats.ToList();
        }

        public async Task DeleteAirplaneSeatsAsync(int airplaneId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);
            
            IEnumerable<AirplaneSeatTypeEntity> seatTypes = await db.QueryAsync<AirplaneSeatTypeEntity>(
                 "GetAirplaneSeatTypes",
               new {AirplaneId = airplaneId},
               commandType:CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirplaneSeatTypeEntity>> GetAirplaneSeatTypesAsync(int airplaneId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirplaneSeatTypeEntity> seatTypes = await db.QueryAsync<AirplaneSeatTypeEntity>(
                "GetAirplaneSeatTypes",
                new {AirplaneId = airplaneId},
                commandType:CommandType.StoredProcedure);

            return seatTypes.ToList();
        }

        public async Task<IReadOnlyCollection<AirplaneEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirplaneEntity> airplanes = await db.QueryAsync<AirplaneEntity>(
                "GetAllAirplanes",
                null,
                commandType: CommandType.StoredProcedure);

            return airplanes.ToList();
        }

        public async Task<AirplaneEntity> GetByIdAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AirplaneEntity>(
                "GetAirplaneById",
                new {Id = id},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<AirplaneEntity>> SearchAirplanesAsync(AirplaneFilterEntity filter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirplaneEntity> airplanes = await db.QueryAsync<AirplaneEntity>(
                "GetAirplaneById",
                filter,
                commandType: CommandType.StoredProcedure);

            return airplanes.ToList();
        }
    }
}