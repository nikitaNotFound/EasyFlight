using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models.Cities;
using DalCity = DataAccessLayer.Models.DataTransfer.Cities.City;
using DalCitySearchOptions = DataAccessLayer.Models.DataTransfer.Cities.CitySearchOptions;
using DataAccessLayer.Repositories.Cities;
using AutoMapper;
using System.Linq;

namespace BusinessLayer.Services.Cities
{
    public class CityService : ICityService
    {
        private ICityRepository cityRepository;
        private IMapper mapper;

        public CityService(ICityRepository cityRepository, IMapper mapper)
        {
            this.cityRepository = cityRepository;
            this.mapper = mapper;
        }


        public async Task<City> GetByIdAsync(int id)
        {
            var foundCityDal = await cityRepository.GetAsync(id);

            var foundCity = mapper.Map<City>(foundCityDal);
            // some business manipulations with city

            return foundCity;
        }

        public async Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions)
        {
            var optionsToSearchDal = mapper.Map<DalCitySearchOptions>(searchOptions);

            var foundCountries = await cityRepository.SearchAsync(optionsToSearchDal);

            return foundCountries.Select(mapper.Map<City>);
        }

        public async Task<ResultTypes> AddAsync(City city)
        {
            var cityToAddDal = mapper.Map<DalCity>(city);

            bool dublicate = await cityRepository.CheckDublicateAsync(cityToAddDal);

            if (!dublicate)
            {
                await cityRepository.AddAsync(cityToAddDal);
                return ResultTypes.OK;
            }

            return ResultTypes.Dublicate;
        }

        public async Task<ResultTypes> UpdateAsync(int id, City city)
        {
            var oldCityDal = await cityRepository.GetAsync(id);

            if (oldCityDal != null)
            {
                var cityDal = mapper.Map<DalCity>(city);
                cityDal.Id = id;

                bool dublicate = await cityRepository.CheckDublicateAsync(cityDal);

                if (!dublicate)
                {
                    await cityRepository.UpdateAsync(cityDal);
                    return ResultTypes.OK;
                }

                return ResultTypes.UpdatingNameExists;
            }

            return ResultTypes.NotFound;
        }
    }
}