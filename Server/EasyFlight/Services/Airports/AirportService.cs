using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyFlight.Errors;
using EasyFlight.Models.Airports;
using EasyFlight.Repositories.Airports;
using EasyFlight.Errors.Types;

namespace EasyFlight.Services.Airports
{
    public class AirportService : IAirportService
    {
        IAirportRepository repository;
        ErrorsHandler errorsHandler;
        public AirportService(IAirportRepository repository, ErrorsHandler errorsHandler)
        {
            this.repository = repository;
            this.errorsHandler = errorsHandler;
        }

        public async Task Add(Airport airport)
        {
            bool dublicate = await repository.CheckDublicateAsync(airport);

            if (!dublicate)
            {
                await repository.AddAsync(airport);
            }
            else
            {
                errorsHandler.ReqisterError(409, new DublicateItemError(airport.Name));
            }
        }

        public async Task<Airport> GetById(int id)
        {
            Airport foundAirport = await repository.GetAsync(id);

            if (foundAirport == null)
            {
                errorsHandler.ReqisterError(404, null);
            }

            return foundAirport;
        }

        public async Task<IEnumerable<Airport>> Search(AirportSearchOptions searchOptions)
        {
            if (searchOptions.CityId == null && searchOptions.Name == null)
            {
                errorsHandler.ReqisterError(415, new InvalidDataError());
            }
            else if (searchOptions.CityId == null)
            {
                return await repository.SearchByNameAsync(searchOptions.Name);
            }
            else
            {
                return await repository.SearchAsync(searchOptions);
            }

            return null;
        }

        public async Task Update(int id, Airport city)
        {
            city.Id = id;
            await repository.UpdateAsync(city);
        }
    }
}