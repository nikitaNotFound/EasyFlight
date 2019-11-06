using BusinessLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Cities
{
    public interface ICityService
    {
        Task<IReadOnlyCollection<City>> GetAllAsync();
        Task<IReadOnlyCollection<City>> SearchByNameAsync(string name);
        Task<City> GetByIdAsync(int id);
        Task<IReadOnlyCollection<Airport>> GetCityAirportsAsync(int id);
        Task<IReadOnlyCollection<Airport>> SearchCityAirportsByName(int cityId, string nameFilter);
        Task<AddResult> AddAsync(City country);
        Task<ResultTypes> UpdateAsync(City city);
    }
}