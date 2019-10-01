using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using EasyFlight.Models.Cities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using EasyFlight.Services.Cities;

namespace EasyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAnyHeaderAndMethod")]
    public class CitiesController : ControllerBase
    {
        ICityService service = null;
        public CitiesController(ICityService service)
        {
            this.service = service;
        }

        // GET api/cities/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            City city = await service.GetById(id);

            if (city != null)
            {
                Response.StatusCode = 200;
                return new ObjectResult(city);
            }

            return new NoContentResult();
        }

        // POST api/cities
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]City city)
        {
            await service.Add(city);

            Response.StatusCode = 201;
            return new NoContentResult();
        }

        // PUT api/cities/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody]City city)
        {
            await service.Update(id, city);

            Response.StatusCode = 202;
            return new NoContentResult();
        }

        // POST api/cities/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> Search([FromBody]CitySearchOptions searchOptions)
        {
            var foundCities = await service.Search(searchOptions);

            if (foundCities != null)
            {
                Response.StatusCode = 200;
                return new ObjectResult(foundCities);
            }

            return new NoContentResult();
        }
    }
}