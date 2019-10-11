﻿using BusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
        Task<ResultTypes> AddAsync(City country);
        Task<ResultTypes> UpdateAsync(City city);
    }
}