using AutoMapper;
using DalCity = DataAccessLayer.Models.DataTransfer.Cities.City;
using DalCitySearchOptions = DataAccessLayer.Models.DataTransfer.Cities.CitySearchOptions;
using DalCountry = DataAccessLayer.Models.DataTransfer.Countries.Country;
using DalCountrySearchOptions = DataAccessLayer.Models.DataTransfer.Countries.CountrySearchOptions;
using BusinessLayer.Models.Cities;
using BusinessLayer.Models.Countries;

namespace BusinessLayer
{
    public static class BlMapping
    {
        public static void Initialize(IMapperConfigurationExpression config)
        {
            config.CreateMap<City, DalCity>();
            config.CreateMap<DalCity, City>();
            config.CreateMap<CitySearchOptions, DalCitySearchOptions>();
            config.CreateMap<DalCitySearchOptions, CitySearchOptions>();

            config.CreateMap<Country, DalCountry>();
            config.CreateMap<DalCountry, Country>();
            config.CreateMap<CountrySearchOptions, DalCountrySearchOptions>();
            config.CreateMap<DalCountrySearchOptions, CountrySearchOptions>();
        }
    }
}