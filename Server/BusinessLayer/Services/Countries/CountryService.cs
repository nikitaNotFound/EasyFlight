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


        public async Task<IReadOnlyCollection<Country>> GetAllAsync()
        {
            IReadOnlyCollection<CountryEntity> countriesDal = await _countryRepository.GetAllAsync();

            IEnumerable<Country> countries =  countriesDal.Select(_mapper.Map<Country>).ToList();

            return  (IReadOnlyCollection<Country>) countries;
        }

        public async Task<Country> GetByIdAsync(int id)
        {
            CountryEntity foundCountryDal = await _countryRepository.GetAsync(id);

            return _mapper.Map<Country>(foundCountryDal);
        }

        public async Task<IReadOnlyCollection<Country>> GetByNameAsync(string name)
        {
            IReadOnlyCollection<CountryEntity> foundCountriesDal = await _countryRepository.GetByNameAsync(name);

            IEnumerable<Country> countries = foundCountriesDal.Select(_mapper.Map<Country>).ToList();

            return (IReadOnlyCollection<Country>) countries;
        }

        public async Task<IReadOnlyCollection<City>> GetCitiesAsync(int id)
        {
            IReadOnlyCollection<CityEntity> citiesDal = await _countryRepository.GetCitiesAsync(id);

            IEnumerable<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return (IReadOnlyCollection<City>) cities;
        }

        public async Task<IReadOnlyCollection<City>> GetCitiesByNameAsync(int id, string name)
        {
            IReadOnlyCollection<CityEntity> citiesDal = await _countryRepository.GetCitiesByNameAsync(id, name);

            IEnumerable<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return (IReadOnlyCollection<City>) cities;
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