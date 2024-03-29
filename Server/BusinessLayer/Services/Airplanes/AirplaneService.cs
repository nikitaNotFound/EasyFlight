﻿using System;
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


        public async Task<ItemsPage<Airplane>> GetAllAsync(int currentPage, int pageLimit)
        {
            ItemsPageEntity<AirplaneEntity> airplanesDal =
                await _airplaneRepository.GetAllAsync(currentPage, pageLimit);

            ItemsPage<Airplane> airplanes = _mapper.Map<ItemsPage<Airplane>>(airplanesDal);

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

        public async Task<ItemsPage<Airplane>> SearchAirplanesAsync(AirplaneFilter filter)
        {
            AirplaneFilterEntity filterDal = _mapper.Map<AirplaneFilterEntity>(filter);

            ItemsPageEntity<AirplaneEntity> airplanesDal =
                await _airplaneRepository.SearchAirplanesAsync(filterDal);

            ItemsPage<Airplane> airplanes = _mapper.Map<ItemsPage<Airplane>>(airplanesDal);

            return airplanes;
        }

        public async Task<AddResult> AddAsync(Airplane airplane)
        {
            AirplaneEntity airplaneDal = _mapper.Map<AirplaneEntity>(airplane);

            bool duplicate = await _airplaneRepository.CheckAirplaneDuplicateAsync(airplaneDal);

            if (duplicate)
            {
                return new AddResult(ResultTypes.Duplicate, null);
            }

            int addedAirplaneId = await _airplaneRepository.AddAsync(airplaneDal);

            return new AddResult(ResultTypes.Ok, addedAirplaneId);
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

            bool existingSeatTypes = true;
            foreach (AirplaneSeat seat in seats)
            {
                AirplaneSeatTypeEntity seatType =
                    await _airplaneRepository.GetSeatTypeById(seat.TypeId);

                if (seatType == null)
                {
                    existingSeatTypes = false;
                    break;
                }
            }

            if (!existingSeatTypes)
            {
                return ResultTypes.NotFound;
            }

            await _airplaneRepository.DeleteAirplaneSeatsAsync(airplaneId);

            AirplaneSeatEntity[] seatsDal = seats.Select(_mapper.Map<AirplaneSeatEntity>).ToArray();

            await _airplaneRepository.UpdateAirplaneSeatsAsync(airplaneId, seatsDal);

            return ResultTypes.Ok;
        }

        public async Task<AddResult> AddAirplaneSeatTypeAsync(AirplaneSeatType seatType)
        {
            AirplaneEntity airplane = await _airplaneRepository.GetByIdAsync(seatType.AirplaneId);

            if (airplane == null)
            {
                return new AddResult(ResultTypes.NotFound, null);
            }

            AirplaneSeatTypeEntity seatTypeDal = _mapper.Map<AirplaneSeatTypeEntity>(seatType);

            bool duplicate = await _airplaneRepository.CheckSeatTypeDuplicateAsync(seatTypeDal);

            if (duplicate)
            {
                return new AddResult(ResultTypes.Duplicate, null);
            }

            int addedAirplaneSeatTypeId = await _airplaneRepository.AddAirplaneSeatTypeAsync(seatTypeDal);

            return new AddResult(ResultTypes.Ok, addedAirplaneSeatTypeId);
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

        public async Task<AirplaneSeat> GetSeatByIdAsync(int seatId)
        {
            AirplaneSeatEntity seatDal = await _airplaneRepository.GetSeatById(seatId);

            return _mapper.Map<AirplaneSeat>(seatDal);
        }

        public async Task<AirplaneSeatType> GetSeatTypeByIdAsync(int seatTypeId)
        {
            AirplaneSeatTypeEntity seatTypeDal = await _airplaneRepository.GetSeatTypeById(seatTypeId);

            return _mapper.Map<AirplaneSeatType>(seatTypeDal);
        }
    }
}
