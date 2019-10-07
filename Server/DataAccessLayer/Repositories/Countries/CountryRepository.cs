using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using DataAccessLayer.Models.Countries;
using AutoMapper;

namespace DataAccessLayer.Repositories.Countries
{
    internal class CountryRepository : ICountryRepository
    {
        private readonly IDalSettings _settings;


        public CountryRepository(IDalSettings settings)
        {
            _settings = settings;
        }


        public async Task<IEnumerable<CountryEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.QueryAsync<CountryEntity>(
                "GetAllCountries",
                null,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<CountryEntity> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<CountryEntity>(
                "GetCountryById",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<CountryEntity>> SearchAsync(CountrySearchOptionsEntity searchOptions)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.QueryAsync<CountryEntity>(
                "SearchCountries",
                searchOptions,
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddAsync(CountryEntity country)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            await db.ExecuteAsync(
                "AddCountry",
                new { name = country.Name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(CountryEntity country)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateCountry",
                country,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(CountryEntity country)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCountryDublicate",
                new { name = country.Name },
                commandType: CommandType.StoredProcedure);
        }
    }
}