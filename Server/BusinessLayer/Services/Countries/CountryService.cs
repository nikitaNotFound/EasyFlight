using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Models.Countries;
using DataAccessLayer.Repositories.Countries;
using DataAccessLayer.Models.Countries;
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
            var foundCountryDal = await _countryRepository.GetAsync(id);

            return _mapper.Map<Country>(foundCountryDal);
        }

        public async Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions)
        {
            var searchOptionsDal = _mapper.Map<CountrySearchOptionsEntity>(searchOptions);

            var foundCountriesDal = await _countryRepository.SearchAsync(searchOptionsDal);

            return foundCountriesDal.Select(_mapper.Map<Country>);
        }

        public async Task<ResultTypes> AddAsync(Country country)
        {
            var countryDal = _mapper.Map<CountryEntity>(country);

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
            var oldCountryDal = await _countryRepository.GetAsync(country.Id);

            if (oldCountryDal != null)
            {
                var countryDal = _mapper.Map<CountryEntity>(country);

                bool dublicate = await _countryRepository.CheckDublicateAsync(countryDal);

                if (!dublicate)
                {
                    await _countryRepository.UpdateAsync(countryDal);
                    return ResultTypes.OK ;
                }

                return ResultTypes.UpdatingNameExists;
            }

            return ResultTypes.NotFound;
        }
    }
}