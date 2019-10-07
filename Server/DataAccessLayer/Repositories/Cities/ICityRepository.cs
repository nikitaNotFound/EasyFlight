﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models.Cities;

namespace DataAccessLayer.Repositories.Cities
{
    public interface ICityRepository
    {
        Task<IEnumerable<CityEntity>> GetAllAsync();
        Task<CityEntity> GetAsync(int id);
        Task<IEnumerable<CityEntity>> SearchAsync(CitySearchOptionsEntity searchOptions);
        Task AddAsync(CityEntity city);
        Task UpdateAsync(CityEntity city);
        Task<bool> CheckDublicateAsync(CityEntity city);
    }
}