using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EasyFlight.Models;
using EasyFlight.Models.Countries;
using Microsoft.AspNetCore.Cors;

namespace EasyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        IRepository<Country, CountrySearchOptions> repository = null;
        public CountriesController(IRepository<Country, CountrySearchOptions> repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult Get(int id)
        {
            Country foundCountry = repository.GetAsync(id);

            if (foundCountry != null)
            {
                return new ObjectResult(foundCountry);
            }

            return new NoContentResult();
        }

        [HttpPost]
        public ActionResult Add([FromBody]Country country)
        {
            try
            {
                repository.AddAsync(country);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                return new JsonResult(new { message = ex.Message });
            }

            return new NoContentResult();
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult Update(int id, [FromBody]Country country)
        {
            country.Id = id;
            repository.UpdateAsync(country);

            return new NoContentResult();
        }

        [HttpPost]
        [Route("searches")]
        public ActionResult Search([FromBody]CountrySearchOptions searchOptions)
        {
            var foundCountries = repository.SearchAsync(searchOptions).ToList();

            return new ObjectResult(foundCountries);
        }
    }
}