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
            City city = repository.Get(id);

            if (city != null)
            {
                return new ObjectResult(city);
            }

            return new NoContentResult();
        }

        [HttpPut]
        [Route("add")]
        public ActionResult Add([FromBody]City city)
        {
            try
            {
                repository.Add(city);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return new JsonResult(new { message = ex.Message });
            }

            return new NoContentResult();
        }

        [HttpPost]
        [Route("update")]
        public ActionResult Update([FromBody]City city)
        {
            repository.Update(city);

            return new NoContentResult();
        }

        [HttpPost]
        [Route("delete/{id}")]
        public ActionResult Delete(int id)
        {
            repository.Delete(id);

            return new NoContentResult();
        }

        [HttpPost]
        [Route("search")]
        public ActionResult Search([FromBody]CitySearchOptions searchOptions)
        {
            IEnumerable<City> foundCities = repository.Search(searchOptions);

            return new ObjectResult(foundCities);
        }
    }
}