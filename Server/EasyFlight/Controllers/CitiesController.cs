using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EasyFlight.Models;
using EasyFlight.Models.Cities;

namespace EasyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        IRepository<City, CitySearchOptions> repository = null;
        public CitiesController(IRepository<City, CitySearchOptions> repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult Get(int id)
        {
            City city = repository.GetAsync(id);

            if (city != null)
            {
                return new ObjectResult(city);
            }

            return new NoContentResult();
        }

        [HttpPost]
        public ActionResult Add([FromBody]City city)
        {
            try
            {
                repository.AddAsync(city);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return new JsonResult(new { message = ex.Message });
            }

            return new NoContentResult();
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult Update(int id, [FromBody]City city)
        {
            city.Id = id;
            repository.UpdateAsync(city);

            return new NoContentResult();
        }

        [HttpPost]
        [Route("searches")]
        public ActionResult Search([FromBody]CitySearchOptions searchOptions)
        {
            IEnumerable<City> foundCities = repository.SearchAsync(searchOptions);

            return new ObjectResult(foundCities);
        }
    }
}