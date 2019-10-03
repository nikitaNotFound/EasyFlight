using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using DataAccessLayer.Models.Entities.Countries;

namespace DataAccessLayer.Repositories.Countries
{
    internal class CountryRepository : ICountryRepository
    {
        private IDalSettings settings;

        public CountryRepository(IDalSettings settings)
        {
            this.settings = settings;
        }


        public async Task<Country> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);
 
            return await db.QuerySingleOrDefaultAsync<Country>(
                "GetCountryById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.QueryAsync<Country>(
                "SearchCountries",
                searchOptions,
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddAsync(Country item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            await db.ExecuteAsync(
                "AddCountry",
                new { name = item.Name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(Country item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateCountry", 
                item,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(Country item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCountryDublicate",
                new { name = item.Name },
                commandType: CommandType.StoredProcedure);
        }
    }
}