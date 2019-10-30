using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Services.Airplanes;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BlAirplane = BusinessLayer.Models.Airplane;
using BlAirplaneFilter = BusinessLayer.Models.AirplaneFilter;
using BlAirplaneSeatType = BusinessLayer.Models.AirplaneSeatType;
using BlAirplaneSeat = BusinessLayer.Models.AirplaneSeat;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AirplanesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAirplaneService _airplaneService;


        public AirplanesController(IMapper mapper, IAirplaneService airplaneService)
        {
            _mapper = mapper;
            _airplaneService = airplaneService;
        }


        // GET api/airplanes{?nameFilter}{?minCarryingKg}{?maxCarryingKg}{?minSeatCount}{?maxSeatCount}
        [HttpGet]
        public async Task<ActionResult> GetAsync(
            string nameFilter,
            int? minCarryingKg,
            int? maxCarryingKg,
            int? minSeatCount,
            int? maxSeatCount
        )
        {
            IReadOnlyCollection<BlAirplane> airplanesBl;

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
                    maxSeatCount);

                BlAirplaneFilter airplaneFilterBl = _mapper.Map<BlAirplaneFilter>(airplaneFilter);

                airplanesBl = await _airplaneService.SearchAirplanesAsync(airplaneFilterBl);
            }
            else
            {
                airplanesBl = await _airplaneService.GetAllAsync();
            }

            IEnumerable<Airplane> airplanes = airplanesBl.Select(_mapper.Map<Airplane>);

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
        
        // GET api/airplanes/{name}
        [HttpGet]
        [Route("{name}")]
        public async Task<ActionResult> GetByNameAsync(string name)
        {
            BlAirplane airplaneBl = await _airplaneService.GetByNameAsync(name);

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
        
        // GET api/airplanes/{airplaneId}/seat-types/{name}
        [HttpGet]
        [Route("{airplaneId}/seat-types/{name}")]
        public async Task<ActionResult> GetAirplaneSeatTypeAsync(int airplaneId, string name)
        {
            BlAirplane airplane = await _airplaneService.GetByIdAsync(airplaneId);

            if (airplane == null)
            {
                return NotFound();
            }

            BlAirplaneSeatType seatTypeBl = await _airplaneService.GetAirplaneSeatTypeByName(airplaneId, name);

            AirplaneSeatType seatType = _mapper.Map<AirplaneSeatType>(seatTypeBl);
            
            return Ok(seatType);
        }
        
        // POST api/airplanes
        [HttpPost]
        public async Task<ActionResult> AddAirplaneAsync([FromBody] Airplane airplane)
        {
            BlAirplane airplaneBl = _mapper.Map<BlAirplane>(airplane);
            
            ResultTypes addResult = await _airplaneService.AddAsync(airplaneBl);

            if (addResult == ResultTypes.Duplicate)
            {
                return BadRequest();
            }

            return Ok();
        }
        
        // PUT api/airplanes
        [HttpPut]
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
        [Route("{airplaneId}/seat-types")]
        public async Task<ActionResult> AddAirplaneSeatTypeAsync(int airplaneId, [FromBody] AirplaneSeatType seatType)
        {
            seatType.AirplaneId = airplaneId;
            
            BlAirplaneSeatType seatTypeBl = _mapper.Map<BlAirplaneSeatType>(seatType);

            ResultTypes addResult = await _airplaneService.AddAirplaneSeatTypeAsync(seatTypeBl);

            switch (addResult)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }
            
            return Ok();
        }
        
        // DELETE api/airplanes/{airplaneId}/seat-types/{seatTypeId}
        [HttpDelete]
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