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
        ICountryRepository repository;
        ErrorsHandler errorsHandler;
        public CountryService(ICountryRepository repository, ErrorsHandler errorsHandler)
        {
            this.repository = repository;
            this.errorsHandler = errorsHandler;
        }

        public async Task<Country> GetById(int id)
        {
            var foundCountry = await repository.GetAsync(id);

            if (foundCountry == null)
            {
                errorsHandler.ReqisterError(404, null);
            }

            return foundCountry;
        }

        public async Task<IEnumerable<Country>> Search(CountrySearchOptions searchOptions)
        {
            return await repository.SearchAsync(searchOptions);
        }

        public async Task Add(Country country)
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

        public async Task Update(int id, Country country)
        {
            country.Id = id;
            await repository.UpdateAsync(country);
        }
    }
}