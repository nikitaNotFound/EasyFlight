using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Models.Countries;
using DataAccessLayer.Repositories.Countries;
using DalCountrySearchOptions = DataAccessLayer.Models.DataTransfer.Countries.CountrySearchOptions;
using DalCountry = DataAccessLayer.Models.DataTransfer.Countries.Country;
using AutoMapper;

namespace BusinessLayer.Services.Countries
{
    public class CountryService : ICountryService
    {
        private ICountryRepository countryRepository;
        private IMapper mapper;

        public CountryService(ICountryRepository countryRepository, IMapper mapper)
        {
            this.countryRepository = countryRepository;
            this.mapper = mapper;
        }


        public async Task<Country> GetByIdAsync(int id)
        {
            var foundCountryDal = await countryRepository.GetAsync(id);

            return mapper.Map<Country>(foundCountryDal);
        }

        public async Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions)
        {
            var searchOptionsDal = mapper.Map<DalCountrySearchOptions>(searchOptions);

            var foundCountriesDal = await countryRepository.SearchAsync(searchOptionsDal);

            return foundCountriesDal.Select(mapper.Map<Country>);
        }

        public async Task<ResultTypes> AddAsync(Country country)
        {
            var countryDal = mapper.Map<DalCountry>(country);

            bool dublicate = await countryRepository.CheckDublicateAsync(countryDal);

            if (!dublicate)
            {
                await countryRepository.AddAsync(countryDal);
                return ResultTypes.OK;
            }

            return ResultTypes.Dublicate;
        }

        public async Task<ResultTypes> UpdateAsync(int id, Country country)
        {
            var oldCountryDal = await countryRepository.GetAsync(id);

            if (oldCountryDal != null)
            {
                var countryDal = mapper.Map<DalCountry>(country);
                countryDal.Id = id;

                bool dublicate = await countryRepository.CheckDublicateAsync(countryDal);

                if (!dublicate)
                {
                    await countryRepository.UpdateAsync(countryDal);
                    return ResultTypes.OK ;
                }

                return ResultTypes.UpdatingNameExists;
            }

            return ResultTypes.NotFound;
        }
    }
}