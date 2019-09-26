using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using EasyFlight.Models;
using EasyFlight.Models.Cities;
using EasyFlight.Exceptions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace EasyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [DisableCors]
    public class CitiesController : ControllerBase
    {
        IRepository<City, CitySearchOptions> repository = null;
        public CitiesController(IRepository<City, CitySearchOptions> repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                City city = await repository.GetAsync(id);

                Response.StatusCode = 200;
                return new ObjectResult(city);
            }
            catch
            {
                Response.StatusCode = 404;
                return new NoContentResult();
            }
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody]City city)
        {
            try
            {
                await repository.AddAsync(city);

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
        public async Task<ActionResult> Update(int id, [FromBody]City city)
        {
            try
            {
                city.Id = id;
                await repository.UpdateAsync(city);

                Response.StatusCode = 202;
                return new NoContentResult();
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return new JsonResult(ex.Message);
            }
        }

        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> Search([FromBody]CitySearchOptions searchOptions)
        {
            var foundCities = await repository.SearchAsync(searchOptions);

            return new ObjectResult(foundCities);
        }
    }
}