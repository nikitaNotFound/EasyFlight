using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EasyFlight.Models;
using EasyFlight.Models.Countries;
using Microsoft.AspNetCore.Cors;
using EasyFlight.Services.Countries;

namespace EasyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllToUrlsFromConfig")]
    public class CountriesController : ControllerBase
    {
        private ICountryService service;

        public CountriesController(ICountryService service)
        {
            this.service = service;
        }


        // GET api/countries/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            Country foundCountry = await service.GetByIdAsync(id);

            if (foundCountry != null)
            {
                Response.StatusCode = 200;
                return new ObjectResult(foundCountry);
            }

            return new NoContentResult();
        }

        // POST api/countries
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Country country)
        {
            await service.AddAsync(country);

            Response.StatusCode = 201;
            return new NoContentResult();
        }

        // PUT api/countries/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] Country country)
        {
            await service.UpdateAsync(id, country);

            Response.StatusCode = 202;
            return new NoContentResult();
        }

        // POST api/countries/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> Search([FromBody] CountrySearchOptions searchOptions)
        {
            var foundCountries = await service.SearchAsync(searchOptions);

            Response.StatusCode = 200;
            return new ObjectResult(foundCountries);
        }
    }
}