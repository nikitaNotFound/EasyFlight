using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Airplanes
{
    public class AirplaneRepository : IAirplaneRepository
    {
        private readonly IDalSettings _dalSettings;
        private readonly IMapper _mapper;


        public AirplaneRepository(IDalSettings dalSettings, IMapper mapper)
        {
            _dalSettings = dalSettings;
            _mapper = mapper;
        }


        public async Task UpdateAsync(AirplaneEntity airplane)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateAirplane",
                airplane,
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAirplaneSeatsAsync(int airplaneId, AirplaneSeatEntity[] seats)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            foreach (AirplaneSeatEntity seat in seats)
            {
                await db.ExecuteAsync(
                    "AddAirplaneSeat",
                    new
                    {
                        airplaneId = airplaneId,
                        floor = seat.Floor,
                        section = seat.Section,
                        zone = seat.Zone,
                        row = seat.Row,
                        number = seat.Number,
                        typeId = seat.TypeId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<int> AddAirplaneSeatTypeAsync(AirplaneSeatTypeEntity seatType)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<int>(
                "AddAirplaneSeatType",
                new
                {
                    airplaneId = seatType.AirplaneId,
                    name = seatType.Name,
                    color = seatType.Color
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteAirplaneSeatTypeAsync(int airplaneId, int seatTypeId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "DeleteAirplaneSeatType",
                new { AirplaneId = airplaneId, SeatTypeId = seatTypeId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckAirplaneDuplicateAsync(AirplaneEntity airplane)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckAirplaneDuplicate",
                new { Name = airplane.Name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckSeatTypeDuplicateAsync(AirplaneSeatTypeEntity seatType)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckSeatTypeDuplicate",
                new
                {
                    airplaneId = seatType.AirplaneId,
                    name = seatType.Name,
                    color = seatType.Color
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AirplaneSeatEntity> GetSeatById(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AirplaneSeatEntity>(
                "GetSeatById",
                new { Id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<int> AddAsync(AirplaneEntity airplane)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<int>(
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

        public async Task<AirplaneSeatTypeEntity> GetSeatTypeById(int seatTypeId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AirplaneSeatTypeEntity>(
                "GetAirplaneSeatTypeById",
                new {Id = seatTypeId},
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteAirplaneSeatsAsync(int airplaneId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<AirplaneSeatTypeEntity> seatTypes = await db.QueryAsync<AirplaneSeatTypeEntity>(
                 "DeleteAirplaneSeats",
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

        public async Task<ItemsPageEntity<AirplaneEntity>> GetAllAsync(int currentPage, int pageLimit)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<PaginationAirplaneEntity> queryResult = await db.QueryAsync<PaginationAirplaneEntity>(
                "GetAllAirplanes",
                new
                {
                    CurrentPage = currentPage,
                    PageLimit = pageLimit
                },
                commandType: CommandType.StoredProcedure);

            if (!queryResult.Any())
            {
                return new ItemsPageEntity<AirplaneEntity>(
                    new List<AirplaneEntity>(),
                    0
                );
            }

            int totalCount = queryResult.First().TotalCount;

            List<AirplaneEntity> airplanes = queryResult.Select(_mapper.Map<AirplaneEntity>).ToList();

            return new ItemsPageEntity<AirplaneEntity>(
                airplanes,
                totalCount
            );
        }

        public async Task<AirplaneEntity> GetByIdAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AirplaneEntity>(
                "GetAirplaneById",
                new {Id = id},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<ItemsPageEntity<AirplaneEntity>> SearchAirplanesAsync(AirplaneFilterEntity filter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<PaginationAirplaneEntity> queryResult = await db.QueryAsync<PaginationAirplaneEntity>(
                    "SearchAirplanes",
                    filter,
                    commandType: CommandType.StoredProcedure);

            if (!queryResult.Any())
            {
                return new ItemsPageEntity<AirplaneEntity>(
                    new List<AirplaneEntity>(),
                    0
                );
            }

            int totalCount = queryResult.First().TotalCount;

            List<AirplaneEntity> airplanes = queryResult.Select(_mapper.Map<AirplaneEntity>).ToList();

            return new ItemsPageEntity<AirplaneEntity>(
                airplanes,
                totalCount
            );
        }
    }
}