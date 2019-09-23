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
            Country foundCountry = repository.Get(id);

            if (foundCountry != null)
            {
                return new ObjectResult(foundCountry);
            }

            return new NoContentResult();
        }

        [HttpPut]
        [Route("add")]
        public ActionResult Add([FromBody]Country country)
        {
            try
            {
                repository.Add(country);
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
        public ActionResult Update([FromBody]Country country)
        {
            repository.Update(country);

            return new NoContentResult();
        }

        [HttpPost]
        [Route("search")]
        public ActionResult Search([FromBody]CountrySearchOptions searchOptions)
        {
            var foundCountries = repository.Search(searchOptions).ToList();

            return new ObjectResult(foundCountries);
        }
    }
}