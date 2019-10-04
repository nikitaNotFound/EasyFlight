using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using DataAccessLayer.Models.DataTransfer.Countries;
using DataAccessLayer.Models.Entities.Countries;
using AutoMapper;

namespace DataAccessLayer.Repositories.Countries
{
    internal class CountryRepository : ICountryRepository
    {
        private IDalSettings settings;
        private IMapper mapper;

        public CountryRepository(IDalSettings settings, IMapper mapper)
        {
            this.settings = settings;
            this.mapper = mapper;
        }


        public async Task<Country> GetAsync(int id)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var foundCountry = await db.QuerySingleOrDefaultAsync<CountryEntity>(
                "GetCountryById",
                new { id = id },
                commandType: CommandType.StoredProcedure);

            return mapper.Map<Country>(foundCountry);
        }

        public async Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var optionsToSearch = mapper.Map<CountrySearchOptionsEntity>(searchOptions);

            var foundCountries = await db.QueryAsync<CountryEntity>(
                "SearchCountries",
                optionsToSearch,
                commandType: CommandType.StoredProcedure);

            return foundCountries.Select(mapper.Map<Country>);
        }

        public async Task AddAsync(Country item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var countryToAdd = mapper.Map<CountryEntity>(item);

            await db.ExecuteAsync(
                "AddCountry",
                new { name = countryToAdd.Name },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(Country item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var countryToUpdate = mapper.Map<CountryEntity>(item);

            await db.ExecuteAsync(
                "UpdateCountry",
                countryToUpdate,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckDublicateAsync(Country item)
        {
            using SqlConnection db = new SqlConnection(settings.ConnectionString);

            var countryToCheck = mapper.Map<CountryEntity>(item);

            return await db.ExecuteScalarAsync<bool>(
                "CheckCountryDublicate",
                new { name = countryToCheck.Name },
                commandType: CommandType.StoredProcedure);
        }
    }
}