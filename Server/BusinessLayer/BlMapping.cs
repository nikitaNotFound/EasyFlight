using AutoMapper;
using DataAccessLayer.Models.Cities;
using DataAccessLayer.Models.Countries;
using BusinessLayer.Models.Cities;
using BusinessLayer.Models.Countries;

namespace BusinessLayer
{
    public static class BlMapping
    {
        public static void Initialize(IMapperConfigurationExpression config)
        {
            config.CreateMap<City, CityEntity>();
            config.CreateMap<CityEntity, City>();
            config.CreateMap<CitySearchOptions, CitySearchOptionsEntity>();
            config.CreateMap<CitySearchOptionsEntity, CitySearchOptions>();

            config.CreateMap<Country, CountryEntity>();
            config.CreateMap<CountryEntity, Country>();
            config.CreateMap<CountrySearchOptions, CountrySearchOptionsEntity>();
            config.CreateMap<CountrySearchOptionsEntity, CountrySearchOptions>();
        }
    }
}