using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using DataAccessLayer.Models.Entities.Cities;
using DataAccessLayer.Models.DataTransfer.Cities;
using AutoMapper;
using System.Linq;

namespace DataAccessLayer.Repositories.Cities
{
    internal class CityRepository : ICityRepository
    {
        private IDalSettings settings;
        private IMapper mapper;

        public CityRepository(IDalSettings settings, IMapper mapper)
        {
            this.settings = settings;
            this.mapper = mapper;
        }


        public async Task<City> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var foundCity = await db.QuerySingleOrDefaultAsync<CityEntity>(
                "GetCityById",
                new { id = id },
                commandType: CommandType.StoredProcedure);

            return mapper.Map<City>(foundCity);
        }

        public async Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var searchOptionsEntity = mapper.Map<CitySearchOptionsEntity>(searchOptions);

            var foundCities = await db.QueryAsync<CityEntity>(
                "SearchCities",
                searchOptionsEntity,
                commandType: CommandType.StoredProcedure);

            return foundCities.Select(mapper.Map<City>);
        }

        public async Task AddAsync(City city)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var cityEntity = mapper.Map<CityEntity>(city);

            await db.ExecuteAsync(
                "AddCity",
                new { name = cityEntity.Name, countryId = cityEntity.CountryId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(City city)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var cityEntity = mapper.Map<CityEntity>(city);

            await db.ExecuteAsync(
                "UpdateCity",
                cityEntity,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(City city)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var cityEntity = mapper.Map<CityEntity>(city);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCityDublicate",
                new { name = cityEntity.Name, countryId = cityEntity.CountryId },
                commandType: CommandType.StoredProcedure);
        }
    }
}