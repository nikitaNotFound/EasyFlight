using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Cities
{
    public interface ICityRepository
    {
        Task<IReadOnlyCollection<CityEntity>> GetAllAsync();
        Task<IReadOnlyCollection<CityEntity>> SearchByNameAsync(string nameFilter);
        Task<CityEntity> GetAsync(int id);
        Task<IReadOnlyCollection<AirportEntity>> GetCityAirportsAsync(int id);
        Task<IReadOnlyCollection<AirportEntity>> SearchCityAirportsByNameAsync(int cityId, string nameFilter);
        Task<CityEntity> AddAsync(CityEntity city);
        Task UpdateAsync(CityEntity city);
        Task<bool> CheckDuplicateAsync(CityEntity city);
    }
}