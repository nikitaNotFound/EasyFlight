using BusinessLayer.Models.Cities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Cities
{
    public interface ICityService
    {
        Task<City> GetByIdAsync(int id);
        Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions);
        Task<ResultTypes> AddAsync(City country);
        Task<ResultTypes> UpdateAsync(int id, City city);
    }
}