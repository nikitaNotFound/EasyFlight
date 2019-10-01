using EasyFlight.Models.Cities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Services.Cities
{
    public interface ICityService
    {
        Task<City> GetById(int id);
        Task<IEnumerable<City>> Search(CitySearchOptions searchOptions);
        Task Add(City country);
        Task Update(int id, City city);
    }
}