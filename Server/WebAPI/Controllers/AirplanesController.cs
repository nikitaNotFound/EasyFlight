using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Services.Airplanes;
using Common;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BlAirplane = BusinessLayer.Models.Airplane;
using BlAirplaneFilter = BusinessLayer.Models.AirplaneFilter;
using BlAirplaneSeatType = BusinessLayer.Models.AirplaneSeatType;
using BlAirplaneSeat = BusinessLayer.Models.AirplaneSeat;
using BlItemsPage = BusinessLayer.Models.ItemsPage<BusinessLayer.Models.Airplane>;
using WebAPI.Models;
using WebAPI.Settings;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AirplanesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAirplaneService _airplaneService;
        private readonly IPaginationSettings _paginationSettings;


        public AirplanesController(
            IMapper mapper,
            IAirplaneService airplaneService,
            IPaginationSettings paginationSettings
        )
        {
            _mapper = mapper;
            _airplaneService = airplaneService;
            _paginationSettings = paginationSettings;
        }


        // GET api/airplanes{?nameFilter}{?minCarryingKg}{?maxCarryingKg}{?minSeatCount}{?maxSeatCount}
        [HttpGet]
        public async Task<ActionResult> GetAsync(
            string nameFilter,
            int? minCarryingKg,
            int? maxCarryingKg,
            int? minSeatCount,
            int? maxSeatCount,
            int? currentPage,
            int? pageLimit
        )
        {
            currentPage ??= _paginationSettings.DefaultPage;
            pageLimit ??= _paginationSettings.MaxPageLimit;

            BlItemsPage airplanesBl;

            if (!string.IsNullOrEmpty(nameFilter)
                || minCarryingKg != null
                || maxCarryingKg != null
                || minSeatCount != null
                || maxSeatCount != null
            )
            {
                AirplaneFilter airplaneFilter = new AirplaneFilter(
                    nameFilter,
                    minCarryingKg,
                    maxCarryingKg,
                    minSeatCount,
                    maxSeatCount,
                    currentPage.Value,
                    pageLimit.Value);

                BlAirplaneFilter airplaneFilterBl = _mapper.Map<BlAirplaneFilter>(airplaneFilter);

                airplanesBl = await _airplaneService.SearchAirplanesAsync(airplaneFilterBl);
            }
            else
            {
                airplanesBl = await _airplaneService.GetAllAsync(currentPage.Value, pageLimit.Value);
            }

            ItemsPage<Airplane> airplanes = _mapper.Map<ItemsPage<Airplane>>(airplanesBl);

            return Ok(airplanes);
        }

        // GET api/airplanes/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            BlAirplane airplaneBl = await _airplaneService.GetByIdAsync(id);

            Airplane airplane = _mapper.Map<Airplane>(airplaneBl);

            if (airplane == null)
            {
                return NotFound();
            }

            return Ok(airplane);
        }

        // GET api/airplanes/{airplaneId}/seats
        [HttpGet]
        [Route("{airplaneId}/seats")]
        public async Task<ActionResult> GetAirplaneSeatsAsync(int airplaneId)
        {
            BlAirplane airplane = await _airplaneService.GetByIdAsync(airplaneId);

            if (airplane == null)
            {
                return NotFound();
            }

            IReadOnlyCollection<BlAirplaneSeat> seatsBl = await _airplaneService.GetAirplaneSeatsAsync(airplaneId);

            IReadOnlyCollection<AirplaneSeat> seats = seatsBl.Select(_mapper.Map<AirplaneSeat>).ToList();

            return Ok(seats);
        }

        // GET api/airplanes/seats/{id}
        [HttpGet]
        [Route("seats/{id}")]
        public async Task<ActionResult> GetSeatByIdAsync(int id)
        {
            BlAirplaneSeat seatBl = await _airplaneService.GetSeatByIdAsync(id);

            if (seatBl == null)
            {
                return NotFound();
            }

            AirplaneSeat seat = _mapper.Map<AirplaneSeat>(seatBl);

            return Ok(seat);
        }

        // GET api/airplanes/seat-types/{id}
        [HttpGet]
        [Route("seat-types/{id}")]
        public async Task<ActionResult> GetSeatTypeByIdAsync(int id)
        {
            BlAirplaneSeatType seatTypeBl = await _airplaneService.GetSeatTypeByIdAsync(id);

            if (seatTypeBl == null)
            {
                return NotFound();
            }

            AirplaneSeatType seatType = _mapper.Map<AirplaneSeatType>(seatTypeBl);

            return Ok(seatType);
        }

        // GET api/airplanes/{airplaneId}/seat-types
        [HttpGet]
        [Route("{airplaneId}/seat-types")]
        public async Task<ActionResult> GetAirplaneSeatTypesAsync(int airplaneId)
        {
            BlAirplane airplane = await _airplaneService.GetByIdAsync(airplaneId);

            if (airplane == null)
            {
                return NotFound();
            }

            IReadOnlyCollection<BlAirplaneSeatType> seatTypesBl =
                await _airplaneService.GetAirplaneSeatTypesAsync(airplaneId);

            IEnumerable<AirplaneSeatType> seatTypes = seatTypesBl.Select(_mapper.Map<AirplaneSeatType>);

            return Ok(seatTypes);
        }

        // POST api/airplanes
        [HttpPost]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        public async Task<ActionResult> AddAirplaneAsync([FromBody] Airplane airplane)
        {
            BlAirplane airplaneBl = _mapper.Map<BlAirplane>(airplane);

            AddResult addAddResult = await _airplaneService.AddAsync(airplaneBl);

            if (addAddResult.ResultType == ResultTypes.Duplicate)
            {
                return BadRequest();
            }

            return Ok(new { Id = addAddResult.ItemId });
        }

        // PUT api/airplanes
        [HttpPut]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        public async Task<ActionResult> UpdateAirplaneAsync([FromBody] Airplane airplane)
        {
            BlAirplane airplaneBl = _mapper.Map<BlAirplane>(airplane);

            ResultTypes addResult = await _airplaneService.UpdateAsync(airplaneBl);

            switch (addResult)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Ok();
        }

        // POST api/airplanes/{airplaneId}/seat-types
        [HttpPost]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        [Route("{airplaneId}/seat-types")]
        public async Task<ActionResult> AddAirplaneSeatTypeAsync(int airplaneId, [FromBody] AirplaneSeatType seatType)
        {
            seatType.AirplaneId = airplaneId;

            BlAirplaneSeatType seatTypeBl = _mapper.Map<BlAirplaneSeatType>(seatType);

            AddResult addAddResult = await _airplaneService.AddAirplaneSeatTypeAsync(seatTypeBl);

            switch (addAddResult.ResultType)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Ok(new { Id = addAddResult.ItemId });
        }

        // DELETE api/airplanes/{airplaneId}/seat-types/{seatTypeId}
        [HttpDelete]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        [Route("{airplaneId}/seat-types/{seatTypeId}")]
        public async Task<ActionResult> DeleteAirplaneSeatTypeAsync(int airplaneId, int seatTypeId)
        {
            ResultTypes deleteResult = await _airplaneService.DeleteAirplaneSeatTypeAsync(airplaneId, seatTypeId);

            if (deleteResult == ResultTypes.NotFound)
            {
                return NotFound();
            }

            return Ok();
        }

        // PUT api/airplanes/{airplaneId}/seats
        [HttpPut]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        [Route("{airplaneId}/seats")]
        public async Task<ActionResult> UpdateAirplaneSeatsAsync(int airplaneId, [FromBody] AirplaneSeat[] seats)
        {
            BlAirplaneSeat[] seatsBl = seats.Select(_mapper.Map<BlAirplaneSeat>).ToArray();

            ResultTypes updateResult = await _airplaneService.UpdateAirplaneSeatsAsync(airplaneId, seatsBl);

            switch (updateResult)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Ok();
        }
    }
}