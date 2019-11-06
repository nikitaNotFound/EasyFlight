using AutoMapper;
using WebAPI.Models;
using BlCity = BusinessLayer.Models.City;
using BlCountry = BusinessLayer.Models.Country;
using BlAirport = BusinessLayer.Models.Airport;
using BlAccount = BusinessLayer.Models.Account;
using BlAirplane = BusinessLayer.Models.Airplane;
using BlAirplaneFilter = BusinessLayer.Models.AirplaneFilter;
using BlAirplaneSeat = BusinessLayer.Models.AirplaneSeat;
using BlAirplaneSeatType = BusinessLayer.Models.AirplaneSeatType;

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

            config.CreateMap<Airport, BlAirport>();
            config.CreateMap<BlAirport, Airport>();

            config.CreateMap<Account, BlAccount>();
            config.CreateMap<BlAccount, Account>();
            config.CreateMap<AccountRequest, BlAccount>();
            
            config.CreateMap<Airplane, BlAirplane>();
            config.CreateMap<BlAirplane, Airplane>();
            config.CreateMap<AirplaneFilter, BlAirplaneFilter>();
            config.CreateMap<AirplaneSeat, BlAirplaneSeat>();
            config.CreateMap<BlAirplaneSeat, AirplaneSeat>();
            config.CreateMap<AirplaneSeatType, BlAirplaneSeatType>();
            config.CreateMap<BlAirplaneSeatType, AirplaneSeatType>();
        }
    }
}