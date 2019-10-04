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
        private IAirportService airportService;
        private IMapper mapper;

        public AirportsController(IAirportService airportService, IMapper mapper)
        {
            this.airportService = airportService;
            this.mapper = mapper;
        }

        // GET api/airports/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            BlAirport airportBl = await airportService.GetByIdAsync(id);

            var airport = mapper.Map<Airport>(airportBl);

            if (airport != null)
            {
                return new ObjectResult(airport);
            }

            return new NotFoundResult();
        }

        // POST api/airports
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody]Airport airport)
        {
            var airportBl = mapper.Map<BlAirport>(airport);
            ResultTypes addResult = await airportService.AddAsync(airportBl);

            if (addResult == ResultTypes.Dublicate)
            {
                string message = $"{airport.Name} already exists!";
                return new JsonResult(new ErrorInfo(message));
            }

            return new StatusCodeResult(201);
        }

        // PUT api/airports/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody]Airport airport)
        {
            var airportBl = mapper.Map<BlAirport>(airport);

            ResultTypes updateResult = await airportService.UpdateAsync(id, airportBl);

            switch (updateResult)
            {
                case ResultTypes.Dublicate:
                    string message = "Such name already exists!";
                    Response.StatusCode = 409;
                    return new JsonResult(new ErrorInfo(message));

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