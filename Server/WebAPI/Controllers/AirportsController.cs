﻿using System;
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


        // GET api/airports
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            IReadOnlyCollection<BlAirport> airportsBl = await _airportService.GetAllAsync();

            IEnumerable<Airport> airports = airportsBl.Select(_mapper.Map<Airport>);

            return Ok(airports);
        }

        // GET api/airports/filters{?name}
        [HttpGet]
        [Route("filters")]
        public async Task<ActionResult> GetByNameAsync(string name)
        {
            IReadOnlyCollection<BlAirport> airportsBl = await _airportService.GetByNameAsync(name);

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

            if (airport != null)
            {
                return Ok(airport);
            }

            return NotFound();
        }

        // POST api/airports
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody]Airport airport)
        {
            BlAirport airportBl = _mapper.Map<BlAirport>(airport);
            ResultTypes addResult = await _airportService.AddAsync(airportBl);

            if (addResult == ResultTypes.Dublicate)
            {
                string message = $"{airport.Name} already exists!";
                return BadRequest(message);
            }

            return StatusCode(201);
        }

        // PUT api/airports
        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] Airport airport)
        {
            BlAirport airportBl = _mapper.Map<BlAirport>(airport);

            ResultTypes updateResult = await _airportService.UpdateAsync(airportBl);

            switch (updateResult)
            {
                case ResultTypes.Dublicate:
                    string message = "Such name already exists!";
                    return BadRequest(message);

                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Accepted();
        }
    }
}