using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Airports;
using BusinessLayer.Services.Airports;
using BlAirport = BusinessLayer.Models.Airports.Airport;
using BlAirportSearchOptions = BusinessLayer.Models.Airports.AirportSearchOptions;
using BusinessLayer;
using AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllToUrlFromConfig")]
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
            BlAirport airportBl = await airportService.GetByIdAsync(id);

            var airport = mapper.Map<Airport>(airportBl);

            if (airport == null)
            {
                return NotFound();
            }

            return Ok(airport);
        }

        // POST api/airports
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody]Airport airport)
        {
            var airportBl = mapper.Map<BlAirport>(airport);
            ResultTypes addResult = await airportService.AddAsync(airportBl);

            if (addResult == ResultTypes.Duplicate)
            {
                return BadRequest();
            }

            return new StatusCodeResult(201);
        }

        // PUT api/airports
        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] Airport airport)
        {
            var airportBl = mapper.Map<BlAirport>(airport);

            ResultTypes updateResult = await _airportService.UpdateAsync(airportBl);

            switch (updateResult)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();

                case ResultTypes.NotFound:
                    return new NotFoundResult();
            }

            return new AcceptedResult();
        }

        // POST api/airports/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> SearchAsync([FromBody]AirportSearchOptions searchOptions)
        {
            var searchOptionsBl = mapper.Map<BlAirportSearchOptions>(searchOptions);

            var foundAirports = await airportService.SearchAsync(searchOptionsBl);

            return new ObjectResult(foundAirports);
        }
    }
}