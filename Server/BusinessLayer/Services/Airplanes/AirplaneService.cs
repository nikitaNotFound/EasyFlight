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
    public class AirplaneService : IAirplaneService
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

        public async Task<IReadOnlyCollection<AirplaneSeat>> GetAirplaneSeatsAsync(int airplaneId)
        {
            IReadOnlyCollection<AirplaneSeatEntity> seatsDal =
                await _airplaneRepository.GetAirplaneSeatsAsync(airplaneId);

            IReadOnlyCollection<AirplaneSeat> seats = seatsDal.Select(_mapper.Map<AirplaneSeat>).ToList();

            return seats;
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

        public async Task<ServiceResult> AddAsync(Airplane airplane)
        {
            AirplaneEntity airplaneDal = _mapper.Map<AirplaneEntity>(airplane);

            bool duplicate = await _airplaneRepository.CheckAirplaneDuplicateAsync(airplaneDal);

            if (duplicate)
            {
                return new ServiceResult(ResultTypes.Duplicate, null);
            }

            int addedAirplaneId = await _airplaneRepository.AddAsync(airplaneDal);

            return new ServiceResult(ResultTypes.Ok, addedAirplaneId);
        }

        public async Task<ResultTypes> UpdateAsync(Airplane airplane)
        {
            AirplaneEntity airplaneDal = _mapper.Map<AirplaneEntity>(airplane);

            // checks if user tries to update airplane to already existent airplane
            bool duplicate = await _airplaneRepository.CheckAirplaneDuplicateAsync(airplaneDal);

            if (duplicate)
            {
                return ResultTypes.Duplicate;
            }

            // checks if user tries to update nonexistent airplane
            AirplaneEntity oldAirplaneDal = await _airplaneRepository.GetByIdAsync(airplaneDal.Id);

            if (oldAirplaneDal == null)
            {
                return ResultTypes.NotFound;
            }

            await _airplaneRepository.UpdateAsync(airplaneDal);

            return ResultTypes.Ok;
        }

        public async Task<ResultTypes> UpdateAirplaneSeatsAsync(int airplaneId, AirplaneSeat[] seats)
        {
            AirplaneEntity updatingAirplane = await  _airplaneRepository.GetByIdAsync(airplaneId);

            if (updatingAirplane == null)
            {
                return ResultTypes.NotFound;
            }

            // checks if all seats from 'seats' array have unique position
            bool unique = seats
                .GroupBy(x => new { x.AirplaneId, x.Floor, x.Section, x.Zone, x.Row, x.Number })
                .All(g => g.Count() == 1);

            if (!unique)
            {
                return ResultTypes.Duplicate;
            }

            await _airplaneRepository.DeleteAirplaneSeatsAsync(airplaneId);

            AirplaneSeatEntity[] seatsDal = seats.Select(_mapper.Map<AirplaneSeatEntity>).ToArray();
            
            await _airplaneRepository.UpdateAirplaneSeatsAsync(airplaneId, seatsDal);

            return ResultTypes.Ok;
        }

        public async Task<ServiceResult> AddAirplaneSeatTypeAsync(AirplaneSeatType seatType)
        {
            AirplaneEntity airplane = await _airplaneRepository.GetByIdAsync(seatType.AirplaneId);

            if (airplane == null)
            {
                return new ServiceResult(ResultTypes.NotFound, null);
            }

            AirplaneSeatTypeEntity seatTypeDal = _mapper.Map<AirplaneSeatTypeEntity>(seatType);
            
            bool duplicate = await _airplaneRepository.CheckSeatTypeDuplicateAsync(seatTypeDal);

            if (duplicate)
            {
                return new ServiceResult(ResultTypes.Duplicate, null);
            }

            int addedAirplaneSeatTypeId = await _airplaneRepository.AddAirplaneSeatTypeAsync(seatTypeDal);

            return new ServiceResult(ResultTypes.Ok, addedAirplaneSeatTypeId);
        }

        public async Task<ResultTypes> DeleteAirplaneSeatTypeAsync(int airplaneId, int seatTypeId)
        {
            AirplaneEntity airplaneDal = await _airplaneRepository.GetByIdAsync(airplaneId);

            if (airplaneDal == null)
            {
                return ResultTypes.NotFound;
            }

            await _airplaneRepository.DeleteAirplaneSeatTypeAsync(airplaneId, seatTypeId);

            return ResultTypes.Ok;
        }
    }
}
