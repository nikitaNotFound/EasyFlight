using BusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Cities
{
    public interface ICityService
    {
        Task<IReadOnlyCollection<City>> GetAllAsync();
        Task<City> GetByIdAsync(int id);
        Task<ResultTypes> AddAsync(City country);
        Task<ResultTypes> UpdateAsync(City city);
    }
}