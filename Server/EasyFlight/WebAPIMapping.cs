using AutoMapper;
using WebAPI.Models.Cities;
using WebAPI.Models.Countries;
using BlCity = BusinessLayer.Models.Cities.City;
using BlCitySearchOptions = BusinessLayer.Models.Cities.CitySearchOptions;
using BlCountry = BusinessLayer.Models.Countries.Country;
using BlCountrySearchOptions = BusinessLayer.Models.Countries.CountrySearchOptions;

namespace WebAPI
{
    public static class WebAPIMapping
    {
        public static void Initialize(IMapperConfigurationExpression config)
        {
            config.CreateMap<City, BlCity>();
            config.CreateMap<BlCity, City>();
            config.CreateMap<CitySearchOptions, BlCitySearchOptions>();
            config.CreateMap<BlCitySearchOptions, CitySearchOptions>();

            config.CreateMap<Country, BlCountry>();
            config.CreateMap<BlCountry, Country>();
            config.CreateMap<CountrySearchOptions, BlCountrySearchOptions>();
            config.CreateMap<BlCountrySearchOptions, CountrySearchOptions>();
        }
    }
}