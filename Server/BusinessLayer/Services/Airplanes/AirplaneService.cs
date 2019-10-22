using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Models;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Airplanes;

namespace BusinessLayer.Services.Airplanes
{
    class AirplaneService : IAirplaneService
    {
        private readonly IMapper _mapper;
        private readonly IAirplaneRepository _airplaneRepository;


        public AirplaneService(IMapper mapper, IAirplaneRepository airplaneRepository)
        {
            _mapper = mapper;
            _airplaneRepository = airplaneRepository;
        }


        public async Task<IReadOnlyCollection<Airplane>> GetAllAsync()
        {
            IReadOnlyCollection<AirplaneEntity> airplanesDal = await _airplaneRepository.GetAllAsync();

            IReadOnlyCollection<Airplane> airplanes = airplanesDal.Select(_mapper.Map<Airplane>).ToList();

            return airplanes;
        }

        public async Task<Airplane> GetByIdAsync(int id)
        {
            AirplaneEntity airplaneDal = await _airplaneRepository.GetByIdAsync(id);

            Airplane airplane = _mapper.Map<Airplane>(airplaneDal);

            return airplane;
        }

        public Task<Array[]> GetAirplaneSeatSchemeAsync(int airplaneId)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyCollection<AirplaneSeatType>> GetAirplaneSeatTypesAsync(int airplaneId)
        {
            IReadOnlyCollection<AirplaneSeatTypeEntity> seatTypesDal =
                await _airplaneRepository.GetAirplaneSeatTypesAsync(airplaneId);

            IReadOnlyCollection<AirplaneSeatType> seatTypes =
                seatTypesDal.Select(_mapper.Map<AirplaneSeatType>).ToList();

            return seatTypes;
        }

        public async Task<IReadOnlyCollection<Airplane>> SearchAirplanesAsync(AirplaneFilter filter)
        {
            AirplaneFilterEntity filterDal = _mapper.Map<AirplaneFilterEntity>(filter);
            
            IReadOnlyCollection<AirplaneEntity> airplanesDal =
                await _airplaneRepository.SearchAirplanesAsync(filterDal);

            IReadOnlyCollection<Airplane> airplanes = airplanesDal.Select(_mapper.Map<Airplane>).ToList();

            return airplanes;
        }

        public Task<ResultTypes> AddAsync(Airplane airplane)
        {
            throw new NotImplementedException();
        }

        public Task<ResultTypes> UpdateAirplaneSeatSchemeAsync(Array[] seatScheme)
        {
            throw new NotImplementedException();
        }

        public Task<ResultTypes> AddAirplaneSeatTypeAsync(AirplaneSeatType seatType)
        {
            throw new NotImplementedException();
        }
    }
}
