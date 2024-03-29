﻿using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using BusinessLayer.Services.Cities;
using BlCity = BusinessLayer.Models.City;
using BlAirport = BusinessLayer.Models.Airport;
using BusinessLayer;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Common;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;
        private readonly IMapper _mapper;


        public CitiesController(ICityService cityService, IMapper mapper)
        {
            _cityService = cityService;
            _mapper = mapper;
        }


        // GET api/cities{?nameFilter}
        [HttpGet]
        public async Task<ActionResult> GetAsync(string nameFilter)
        {
            IReadOnlyCollection<BlCity> citiesBl;

            if (string.IsNullOrEmpty(nameFilter))
            {
                citiesBl = await _cityService.GetAllAsync();
            }
            else
            {
                citiesBl = await _cityService.SearchByNameAsync(nameFilter);
            }

            IEnumerable<City> cities = citiesBl.Select(_mapper.Map<City>);

            return Ok(cities);
        }

        // GET api/cities/{id}
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            BlCity blCity = await _cityService.GetByIdAsync(id);

            City city = _mapper.Map<City>(blCity);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        // GET api/cities/{cityId}/airports{?nameFilter}
        [HttpGet]
        [Route("{cityId}/airports")]
        public async Task<ActionResult> GetAirportsAsync(int cityId, string nameFilter)
        {
            IReadOnlyCollection<BlAirport> airportsBl;

            if (string.IsNullOrEmpty(nameFilter))
            {
                airportsBl = await _cityService.GetCityAirportsAsync(cityId);
            }
            else
            {
                airportsBl = await _cityService.SearchCityAirportsByName(cityId, nameFilter);
            }

            IEnumerable<Airport> airports = airportsBl.Select(_mapper.Map<Airport>);

            return Ok(airports);
        }

        // POST api/cities
        [HttpPost]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        public async Task<ActionResult> AddAsync([FromBody] City city)
        {
            BlCity cityBl = _mapper.Map<BlCity>(city);

            AddResult addingAddResult = await _cityService.AddAsync(cityBl);

            if (addingAddResult.ResultType == ResultTypes.Duplicate)
            {
                return BadRequest();
            }

            return Ok(new { Id = addingAddResult.ItemId });
        }

        // PUT api/cities
        [HttpPut]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        public async Task<ActionResult> UpdateAsync([FromBody] City city)
        {
            BlCity cityBl = _mapper.Map<City, BlCity>(city);

            ResultTypes updatingResult = await _cityService.UpdateAsync(cityBl);

            switch (updatingResult)
            {
                case ResultTypes.NotFound:
                    return NotFound();

                case ResultTypes.Duplicate:
                    return BadRequest();
            }

            return Ok();
        }
    }
}