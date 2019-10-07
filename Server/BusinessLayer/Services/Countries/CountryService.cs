using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Countries;
using DataAccessLayer.Models;
using AutoMapper;

namespace BusinessLayer.Services.Countries
{
    public class CountryService : ICountryService
    {
        private readonly ICountryRepository _countryRepository;
        private readonly IMapper _mapper;


        public CountryService(ICountryRepository countryRepository, IMapper mapper)
        {
            _countryRepository = countryRepository;
            _mapper = mapper;
        }


        public async Task<IEnumerable<Country>> GetAllAsync()
        {
            IEnumerable<CountryEntity> countriesDal = await _countryRepository.GetAllAsync();

            IEnumerable<Country> countries = countriesDal.Select(_mapper.Map<Country>);

            return countries;
        }

        public async Task<Country> GetByIdAsync(int id)
        {
            CountryEntity foundCountryDal = await _countryRepository.GetAsync(id);

            return _mapper.Map<Country>(foundCountryDal);
        }

        public async Task<IEnumerable<Country>> GetByNameAsync(string name)
        {
            IEnumerable<CountryEntity> foundCountriesDal = await _countryRepository.GetByNameAsync(name);

            return foundCountriesDal.Select(_mapper.Map<Country>);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync(int id)
        {
            IEnumerable<CityEntity> citiesDal = await _countryRepository.GetCitiesAsync(id);

            return citiesDal.Select(_mapper.Map<City>);
        }

        public async Task<IEnumerable<City>> GetCitiesByNameAsync(int id, string name)
        {
            IEnumerable<CityEntity> citiesDal = await _countryRepository.GetCitiesByNameAsync(id, name);

            return citiesDal.Select(_mapper.Map<City>);
        }

        public async Task<ResultTypes> AddAsync(Country country)
        {
            CountryEntity countryDal = _mapper.Map<CountryEntity>(country);

            bool dublicate = await _countryRepository.CheckDublicateAsync(countryDal);

            if (!dublicate)
            {
                await _countryRepository.AddAsync(countryDal);
                return ResultTypes.OK;
            }

            return ResultTypes.Dublicate;
        }

        public async Task<ResultTypes> UpdateAsync(Country country)
        {
            CountryEntity oldCountryDal = await _countryRepository.GetAsync(country.Id);

            if (oldCountryDal != null)
            {
                CountryEntity countryDal = _mapper.Map<CountryEntity>(country);

                bool dublicate = await _countryRepository.CheckDublicateAsync(countryDal);

                if (!dublicate)
                {
                    await _countryRepository.UpdateAsync(countryDal);
                    return ResultTypes.OK ;
                }

                return ResultTypes.Dublicate;
            }

            return ResultTypes.NotFound;
        }
    }
}