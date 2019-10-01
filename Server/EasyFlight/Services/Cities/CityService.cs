using System.Collections.Generic;
using System.Threading.Tasks;
using EasyFlight.Models.Cities;
using EasyFlight.Repositories.Cities;
using EasyFlight.Errors;

namespace EasyFlight.Services.Cities
{
    public class CityService : ICityService
    {
        ICityRepository repository;
        ErrorsHandler errorsHandler;
        public CityService(ICityRepository repository, ErrorsHandler errorsHandler)
        {
            this.repository = repository;
            this.errorsHandler = errorsHandler;
        }

        public async Task<City> GetById(int id)
        {
            var foundCity = await repository.GetAsync(id);

            if (foundCity == null)
            {
                errorsHandler.ReqisterError(404, null);
            }

            return foundCity;
        }

        public async Task<IEnumerable<City>> Search(CitySearchOptions searchOptions)
        {
            return await repository.SearchAsync(searchOptions);
        }

        public async Task Add(City city)
        {
            bool dublicate = await repository.CheckDublicateAsync(city);

            if (!dublicate)
            {
                await repository.AddAsync(city);
            }
            else
            {
                errorsHandler.ReqisterError(409, $"{city.Name} already exists!");
            }
        }

        public async Task Update(int id, City country)
        {
            country.Id = id;
            await repository.UpdateAsync(country);
        }
    }
}