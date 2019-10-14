using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Countries
{
    internal class CountryRepository : ICountryRepository
    {
        private readonly IDalSettings _dalSettings;


        public CountryRepository(IDalSettings settings)
        {
            _dalSettings = settings;
        }


        public async Task<IReadOnlyCollection<CountryEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<CountryEntity> countries = await db.QueryAsync<CountryEntity>(
                "getAllCountries",
                null,
                commandType: CommandType.StoredProcedure);

            return countries.ToList();
        }

        public async Task<CountryEntity> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<CountryEntity>(
                "getCountryById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<CountryEntity>> SearchByNameAsync(string nameFilter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<CountryEntity> countries = await db.QueryAsync<CountryEntity>(
                "searchCountriesByName",
                new { nameFilter = nameFilter },
                commandType: CommandType.StoredProcedure);

            return countries.ToList();
        }

        public async Task<IReadOnlyCollection<CityEntity>> GetCountryCitiesAsync(int countryId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<CityEntity> countries = await db.QueryAsync<CityEntity>(
                "getCountryCities",
                new { countryId = countryId },
                commandType: CommandType.StoredProcedure);

            return countries.ToList();
        }

        public async Task<IReadOnlyCollection<CityEntity>> SearchCountryCitiesByNameAsync(
            int countryId,
            string nameFilter
        )
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<CityEntity> countries = await db.QueryAsync<CityEntity>(
                "searchCountryCitiesByName",
                new { countryId = countryId, nameFilter = nameFilter },
                commandType: CommandType.StoredProcedure);

            return countries.ToList();
        }

        public async Task AddAsync(CountryEntity country)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "addCountry",
                new { name = country.Name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(CountryEntity country)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "updateCountry",
                country,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(CountryEntity country)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "checkCountryDublicate",
                new { name = country.Name },
                commandType: CommandType.StoredProcedure);
        }
    }
}