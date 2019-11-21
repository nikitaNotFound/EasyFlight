using AutoMapper;
using DataAccessLayer.Models;

namespace DataAccessLayer
{
    public static class DalMapping
    {
        public static void Initialize(IMapperConfigurationExpression config)
        {
            config.CreateMap<PaginationAirplaneEntity, AirplaneEntity>();
            config.CreateMap<PaginationFlightEntity, FlightEntity>();
        }
    }
}