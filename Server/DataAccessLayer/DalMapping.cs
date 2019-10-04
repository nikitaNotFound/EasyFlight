using AutoMapper;
using DataAccessLayer.Models.Entities.Cities;
using DataAccessLayer.Models.DataTransfer.Cities;
using DataAccessLayer.Models.Entities.Countries;
using DataAccessLayer.Models.DataTransfer.Countries;

namespace DataAccessLayer
{
    public static class DalMapping
    {
        public static void Initialize(IMapperConfigurationExpression config)
        {
            config.CreateMap<City, CityEntity>();
            config.CreateMap<CityEntity, City>();
            config.CreateMap<CitySearchOptions, CitySearchOptionsEntity>();

            config.CreateMap<CountryEntity, Country>();
            config.CreateMap<Country, CountryEntity>();
            config.CreateMap<CountrySearchOptions, CountrySearchOptionsEntity>();
        }
    }
}