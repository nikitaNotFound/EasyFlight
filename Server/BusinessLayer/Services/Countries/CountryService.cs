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

            IReadOnlyCollection<Country> countries =  countriesDal.Select(_mapper.Map<Country>).ToList();

            return countries;
        }

        public async Task<Country> GetByIdAsync(int id)
        {
            CountryEntity foundCountryDal = await _countryRepository.GetAsync(id);

            return _mapper.Map<Country>(foundCountryDal);
        }

        public async Task<IReadOnlyCollection<Country>> SearchByNameAsync(string nameFilter)
        {
            IReadOnlyCollection<CountryEntity> foundCountriesDal =
                await _countryRepository.SearchByNameAsync(nameFilter);

            IReadOnlyCollection<Country> countries = foundCountriesDal.Select(_mapper.Map<Country>).ToList();

            return countries;
        }

        public async Task<IReadOnlyCollection<City>> GetCountryCitiesAsync(int countryId)
        {
            IReadOnlyCollection<CityEntity> citiesDal = await _countryRepository.GetCountryCitiesAsync(countryId);

            IReadOnlyCollection<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return cities;
        }

        public async Task<IReadOnlyCollection<City>> SearchCountryCitiesByNameAsync(int countryId, string nameFilter)
        {
            IReadOnlyCollection<CityEntity> citiesDal =
                await _countryRepository.SearchCountryCitiesByNameAsync(countryId, nameFilter);

            IReadOnlyCollection<City> cities = citiesDal.Select(_mapper.Map<City>).ToList();

            return cities;
        } 

        public async Task<ResultTypes> AddAsync(Country country)
        {
            CountryEntity countryDal = _mapper.Map<CountryEntity>(country);

            bool dublicate = await _countryRepository.CheckDuplicateAsync(countryDal);

            if (!dublicate)
            {
                await _countryRepository.AddAsync(countryDal);
                return ResultTypes.Ok;
            }

            return ResultTypes.Duplicate;
        }

        public async Task<ResultTypes> UpdateAsync(Country country)
        {
            CountryEntity oldCountryDal = await _countryRepository.GetAsync(country.Id);

            if (oldCountryDal != null)
            {
                CountryEntity countryDal = _mapper.Map<CountryEntity>(country);

                bool dublicate = await _countryRepository.CheckDuplicateAsync(countryDal);

                if (!dublicate)
                {
                    await _countryRepository.UpdateAsync(countryDal);
                    return ResultTypes.Ok ;
                }

                return ResultTypes.Duplicate;
            }

            return ResultTypes.NotFound;
        }
    }
}