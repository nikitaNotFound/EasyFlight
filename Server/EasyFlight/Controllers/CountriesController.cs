using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EasyFlight.Models;
using EasyFlight.Models.Countries;
using EasyFlight.Exceptions;
using Microsoft.AspNetCore.Cors;

namespace EasyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAnyHeaderAndMethod")]
    public class CountriesController : ControllerBase
    {
        IRepository<Country, CountrySearchOptions> repository = null;
        public CountriesController(IRepository<Country, CountrySearchOptions> repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                Country foundCountry = await repository.GetAsync(id);

                Response.StatusCode = 200;
                return new ObjectResult(foundCountry);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 404;
                return new JsonResult(new ErrorMessage(ex.Message));
            }
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody]Country country)
        {
            try
            {
                await repository.AddAsync(country);

                Response.StatusCode = 201;
                return new NoContentResult();
            }
            catch (Exception ex)
            {
                Response.StatusCode = 409;
                return new JsonResult(new ErrorMessage(ex.Message));
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody]Country country)
        {
            try
            {
                country.Id = id;
                await repository.UpdateAsync(country);

                Response.StatusCode = 202;
                return new NoContentResult();
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return new JsonResult(new ErrorMessage(ex.Message));
            }
        }

        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> Search([FromBody]CountrySearchOptions searchOptions)
        {
            var foundCountries = await repository.SearchAsync(searchOptions);

            Response.StatusCode = 200;
            return new ObjectResult(foundCountries);
        }
    }
}