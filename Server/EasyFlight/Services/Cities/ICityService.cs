using EasyFlight.Models.Cities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Services.Cities
{
    public interface ICityService
    {
        Task<City> GetByIdAsync(int id);
        Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions);
        Task AddAsync(City country);
        Task UpdateAsync(int id, City city);
    }
}