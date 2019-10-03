using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyFlight.Models.Countries;
using EasyFlight.Repositories.Countries;
using EasyFlight.Errors;

namespace EasyFlight.Services.Countries
{
    public class CountryService : ICountryService
    {
        private ICountryRepository repository;
        private ErrorsHandler errorsHandler;

        public CountryService(ICountryRepository repository, ErrorsHandler errorsHandler)
        {
            this.repository = repository;
            this.errorsHandler = errorsHandler;
        }


        public async Task<Country> GetByIdAsync(int id)
        {
            var foundCountry = await repository.GetAsync(id);

            if (foundCountry == null)
            {
                errorsHandler.ReqisterError(404, null);
            }

            return foundCountry;
        }

        public async Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions)
        {
            return await repository.SearchAsync(searchOptions);
        }

        public async Task AddAsync(Country country)
        {
            bool dublicate = await repository.CheckDublicateAsync(country);

            if (!dublicate)
            {
                await repository.AddAsync(country);
            }
            else
            {
                errorsHandler.ReqisterError(409, $"{country.Name} already exists!");
            }
        }

        public async Task UpdateAsync(int id, Country country)
        {
            country.Id = id;

            bool existing = await repository.CheckDublicateAsync(country);

            if (existing)
            {
                await repository.UpdateAsync(country);
            }
            else
            {
                // throw Exception
            }
        }
    }
}