using AutoMapper;
using DataAccessLayer.Models;
using BusinessLayer.Models;

namespace BusinessLayer
{
    public static class BlMapping
    {
        public static void Initialize(IMapperConfigurationExpression config)
        {
            config.CreateMap<City, CityEntity>();
            config.CreateMap<CityEntity, City>();

            config.CreateMap<Country, CountryEntity>();
            config.CreateMap<CountryEntity, Country>();

            config.CreateMap<Airport, AirportEntity>();
            config.CreateMap<AirportEntity, Airport>();

            config.CreateMap<Account, AccountEntity>();
            config.CreateMap<AccountEntity, Account>();

            config.CreateMap<Airplane, AirplaneEntity>();
            config.CreateMap<AirplaneEntity, Airplane>();
            config.CreateMap<AirplaneFilter, AirplaneFilterEntity>();
            config.CreateMap<AirplaneSeat, AirplaneSeatEntity>();
            config.CreateMap<AirplaneSeatEntity, AirplaneSeat>();
            config.CreateMap<AirplaneSeatType, AirplaneSeatTypeEntity>();
            config.CreateMap<AirplaneSeatTypeEntity, AirplaneSeatType>();

            config.CreateMap<Flight, FlightEntity>();
            config.CreateMap<FlightEntity, Flight>();
            config.CreateMap<FlightSeatTypeCost, FlightSeatTypeCostEntity>();
            config.CreateMap<FlightSeatTypeCostEntity, FlightSeatTypeCost>();
            config.CreateMap<FlightFilter, FlightFilterEntity>();
            config.CreateMap<FlightFilterEntity, FlightFilter>();
            config.CreateMap<FlightBookInfo, FlightBookInfoEntity>();
            config.CreateMap<FlightBookInfoEntity, FlightBookInfo>();
            config.CreateMap<AccountBook, AccountBookEntity>();
            config.CreateMap<AccountBookEntity, AccountBook>();
        }
    }
}