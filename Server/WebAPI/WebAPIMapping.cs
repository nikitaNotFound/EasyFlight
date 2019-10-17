using AutoMapper;
using WebAPI.Models;
using BlCity = BusinessLayer.Models.City;
using BlCountry = BusinessLayer.Models.Country;

namespace WebAPI
{
    public static class WebAPIMapping
    {
        public static void Initialize(IMapperConfigurationExpression config)
        {
            config.CreateMap<City, BlCity>();
            config.CreateMap<BlCity, City>();

            config.CreateMap<Country, BlCountry>();
            config.CreateMap<BlCountry, Country>();
        }
    }
}