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
    [EnableCors("AllowAllToUrlsFromConfig")]
    public class CitiesController : ControllerBase
    {
        private ICityService cityService;

        public CitiesController(ICityService cityService)
        {
            this.cityService = cityService;
        }


        // GET api/cities/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            City city = await cityService.GetByIdAsync(id);

            if (city != null)
            {
                Response.StatusCode = 200;
                return new ObjectResult(city);
            }

            return new NoContentResult();
        }

        // POST api/cities
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] City city)
        {
            await cityService.AddAsync(city);

            Response.StatusCode = 201;
            return new NoContentResult();
        }

        // PUT api/cities/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] City city)
        {
            await cityService.UpdateAsync(id, city);

            Response.StatusCode = 202;
            return new NoContentResult();
        }

        // POST api/cities/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> Search([FromBody] CitySearchOptions searchOptions)
        {
            var foundCities = await cityService.SearchAsync(searchOptions);

            Response.StatusCode = 200;
            return new ObjectResult(foundCities);
        }
    }
}