using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using DataAccessLayer.Models;
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


        public async Task<IReadOnlyCollection<CountryEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return (IReadOnlyCollection<CountryEntity>) await db.QueryAsync<CountryEntity>(
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

        public async Task<IReadOnlyCollection<CountryEntity>> GetByNameAsync(string name)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return (IReadOnlyCollection<CountryEntity>) await db.QueryAsync<CountryEntity>(
                "SearchCountries",
                new { name = name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<CityEntity>> GetCitiesAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return (IReadOnlyCollection<CityEntity>) await db.QueryAsync<CityEntity>(
                "GetCountryCities",
                new { id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<CityEntity>> GetCitiesByNameAsync(int id, string name)
        {
            using SqlConnection db = new SqlConnection(_settings.ConnectionString);

            return (IReadOnlyCollection<CityEntity>) await db.QueryAsync<CityEntity>(
                "GetCountryCitiesByName",
                new { id = id, name = name },
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