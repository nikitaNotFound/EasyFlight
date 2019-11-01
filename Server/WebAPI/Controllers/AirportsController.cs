using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using BusinessLayer.Services.Airports;
using BlAirport = BusinessLayer.Models.Airport;
using BusinessLayer;
using AutoMapper;
using Common;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AirportsController : ControllerBase
    {
        private readonly IAirportService _airportService;
        private readonly IMapper _mapper;

        
        public AirportsController(IAirportService airportService, IMapper mapper)
        {
            _airportService = airportService;
            _mapper = mapper;
        }


        // GET api/airports{?nameFilter}
        [HttpGet]
        public async Task<ActionResult> GetAllAsync(string nameFilter)
        {
            IReadOnlyCollection<BlAirport> airportsBl;

            if (!string.IsNullOrEmpty(nameFilter))
            {
                airportsBl = await _airportService.GetByNameAsync(nameFilter);
            }
            else
            {
                airportsBl = await _airportService.GetAllAsync();
            }

            IEnumerable<Airport> airports = airportsBl.Select(_mapper.Map<Airport>);

            return Ok(airports);
        }

        // GET api/airports/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            BlAirport airportBl = await _airportService.GetByIdAsync(id);

            Airport airport = _mapper.Map<Airport>(airportBl);

            if (airport == null)
            {
                return NotFound();
            }

            return Ok(airport);
        }

        // POST api/airports
        [HttpPost]
        [Authorize(nameof(AccountRole.Admin))]
        public async Task<ActionResult> AddAsync([FromBody]Airport airport)
        {
            BlAirport airportBl = _mapper.Map<BlAirport>(airport);

            ServiceResult addResult = await _airportService.AddAsync(airportBl);

            if (addResult.ResultType == ResultTypes.Duplicate)
            {
                return BadRequest();
            }

            return Ok(new { Id = addResult.ItemId });
        }

        // PUT api/airports/{id}
        [HttpPut]
        [Authorize(nameof(AccountRole.Admin))]
        public async Task<ActionResult> UpdateAsync([FromBody] Airport airport)
        {
            BlAirport airportBl = _mapper.Map<BlAirport>(airport);

            ResultTypes updateResult = await _airportService.UpdateAsync(airportBl);

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