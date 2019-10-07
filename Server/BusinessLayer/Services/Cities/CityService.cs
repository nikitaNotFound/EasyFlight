using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Cities;
using AutoMapper;
using System.Linq;

namespace BusinessLayer.Services.Cities
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;


        public CityService(ICityRepository cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }


        public async Task<IEnumerable<City>> GetAllAsync()
        {
            IEnumerable<CityEntity> citiesDal = await _cityRepository.GetAllAsync();

            IEnumerable<City> cities = citiesDal.Select(_mapper.Map<City>);

            return cities;
        }

        public async Task<City> GetByIdAsync(int id)
        {
            var foundCityDal = await _cityRepository.GetAsync(id);

            var foundCity = _mapper.Map<City>(foundCityDal);

            return foundCity;
        }

        public async Task<ResultTypes> AddAsync(City city)
        {
            var cityDal = _mapper.Map<CityEntity>(city);

            bool dublicate = await _cityRepository.CheckDublicateAsync(cityDal);

            if (!dublicate)
            {
                await _cityRepository.AddAsync(cityDal);
                return ResultTypes.OK;
            }

            return ResultTypes.Dublicate;
        }

        public async Task<ResultTypes> UpdateAsync(City city)
        {
            var oldCityDal = await _cityRepository.GetAsync(city.Id);

            if (oldCityDal != null)
            {
                var cityDal = _mapper.Map<CityEntity>(city);

                bool dublicate = await _cityRepository.CheckDublicateAsync(cityDal);

                if (!dublicate)
                {
                    await _cityRepository.UpdateAsync(cityDal);
                    return ResultTypes.OK;
                }

                return ResultTypes.Dublicate;
            }

            return ResultTypes.NotFound;
        }
    }
}