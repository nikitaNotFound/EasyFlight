using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Services.Airplanes;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BlAirplane = BusinessLayer.Models.Airplane;
using BlAirplaneFilter = BusinessLayer.Models.AirplaneFilter;
using BlAirplaneSeatType = BusinessLayer.Models.AirplaneSeatType;
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


        // GET api/airplanes
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            IReadOnlyCollection<BlAirplane> airplanesBl = await _airplaneService.GetAllAsync();

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
            
            return Ok(airplane);
        }

        // GET api/airplanes/{airplaneId}/seat-scheme
        [HttpGet]
        [Route("{airplaneId}/seats-scheme")]
        public async Task<ActionResult> GetAirplaneSeatsAsync(int airplaneId)
        {
            Array[] seatCheme = await _airplaneService.GetAirplaneSeatSchemeAsync(airplaneId);
            
            return Ok(seatCheme);
        }

        // GET api/airplanes/{airplaneId}/seat-types
        [HttpGet]
        [Route("{airplaneId}/seat-types")]
        public async Task<ActionResult> GetAirplaneSeatTypesAsync(int airplaneId)
        {
            IReadOnlyCollection<BlAirplaneSeatType> seatTypesBl =
                await _airplaneService.GetAirplaneSeatTypesAsync(airplaneId);

            IEnumerable<AirplaneSeatType> seatTypes = seatTypesBl.Select(_mapper.Map<AirplaneSeatType>);
            
            return Ok();
        }

        // GET api/airplanes/searches{?nameFilter}{?minCarryingKg}{?maxCarryingKg}{?minSeatCount}{?maxSeatCount}
        [HttpGet]
        public async Task<ActionResult> SearchAirplanes(
            string nameFilter,
            int minCarryingKg,
            int maxCarryingKg,
            int minSeatCount,
            int maxSeatCount
        )
        {
            AirplaneFilter airplaneFilter = new AirplaneFilter(
                nameFilter,
                minCarryingKg,
                maxCarryingKg,
                minSeatCount,
                maxSeatCount);

            BlAirplaneFilter airplaneFilterBl = _mapper.Map<BlAirplaneFilter>(airplaneFilter);

            IEnumerable<BlAirplane> airplanesBl = await _airplaneService.SearchAirplanesAsync(airplaneFilterBl);

            IEnumerable<Airplane> airplanes = airplanesBl.Select(_mapper.Map<Airplane>);
            
            return Ok(airplanes);
        }   

        // POST api/airplanes
        [HttpPost]
        public async Task<ActionResult> AddAirplaneAsync([FromBody] Airplane airplane)
        {
            BlAirplane airplaneBl = _mapper.Map<BlAirplane>(airplane);
            
            ResultTypes addResult = await _airplaneService.AddAsync(airplaneBl);

            if (addResult == ResultTypes.Dublicate)
            {
                return BadRequest();
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

            if (addResult == ResultTypes.Dublicate)
            {
                return BadRequest();
            }

            return Ok();
        }

        // PUT api/airplanes/{airplaneId}/seat-scheme
        [HttpPut]
        [Route("{airplaneId}/seats")]
        public async Task<ActionResult> UpdateAirplaneSeatSchemeAsync(int airplaneId, [FromBody] Array[] seatScheme)
        {
            ResultTypes updateResult = await _airplaneService.UpdateAirplaneSeatSchemeAsync(seatScheme);

            if (updateResult == ResultTypes.NotFound)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}