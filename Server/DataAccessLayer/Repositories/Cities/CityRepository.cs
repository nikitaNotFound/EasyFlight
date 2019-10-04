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

            var optionsToSearch = mapper.Map<CitySearchOptionsEntity>(searchOptions);

            var foundCities = await db.QueryAsync<CityEntity>(
                "SearchCities",
                optionsToSearch,
                commandType: CommandType.StoredProcedure);

            return foundCities.Select(mapper.Map<City>);
        }

        public async Task AddAsync(City item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var cityToAdd = mapper.Map<CityEntity>(item);

            await db.ExecuteAsync(
                "AddCity",
                new { name = cityToAdd.Name, countryId = cityToAdd.CountryId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(City item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var cityToUpdate = mapper.Map<CityEntity>(item);

            await db.ExecuteAsync(
                "UpdateCity",
                cityToUpdate,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(City item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var cityToCheck = mapper.Map<CityEntity>(item);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCityDublicate",
                new { name = cityToCheck.Name, countryId = cityToCheck.CountryId },
                commandType: CommandType.StoredProcedure);
        }
    }
}