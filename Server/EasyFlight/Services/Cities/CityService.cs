using System.Collections.Generic;
using System.Threading.Tasks;
using EasyFlight.Models.Cities;
using EasyFlight.Repositories.Cities;
using EasyFlight.Errors;

namespace EasyFlight.Services.Cities
{
    public class CityService : ICityService
    {
        private ICityRepository cityRepository;
        private ErrorsHandler errorsHandler;

        public CityService(ICityRepository cityRepository, ErrorsHandler errorsHandler)
        {
            this.cityRepository = cityRepository;
            this.errorsHandler = errorsHandler;
        }


        public async Task<City> GetByIdAsync(int id)
        {
            var foundCity = await cityRepository.GetAsync(id);

            if (foundCity == null)
            {
                errorsHandler.ReqisterError(404, null);
            }

            return foundCity;
        }

        public async Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions)
        {
            return await cityRepository.SearchAsync(searchOptions);
        }

        public async Task AddAsync(City city)
        {
            bool dublicate = await cityRepository.CheckDublicateAsync(city);

            if (!dublicate)
            {
                await cityRepository.AddAsync(city);
            }
            else
            {
                errorsHandler.ReqisterError(409, $"{city.Name} already exists!");
            }
        }

        public async Task UpdateAsync(int id, City country)
        {
            country.Id = id;

            bool existing = await cityRepository.CheckDublicateAsync(country);

            if (existing)
            {
                await cityRepository.UpdateAsync(country);
            }
            else
            {
                // throw Exception
            }
        }
    }
}