using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EasyFlight.Models.Airports;

namespace EasyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAnyHeaderAndMethod")]
    public class AirportsController : ControllerBase
    {
        IAirportService service = null;
        public AirportsController(IAirportService service)
        {
            this.service = service;
        }

        // GET api/airports/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            Airport airport = await service.GetById(id);

            if (airport != null)
            {
                Response.StatusCode = 200;
                return new ObjectResult(airport);
            }

            return new NoContentResult();
        }

        // POST api/airports
        [HttpPost]
        public async Task<ActionResult> Add([FromBody]Airport city)
        {
            await service.Add(city);

            Response.StatusCode = 201;
            return new NoContentResult();
        }

        // PUT api/airports/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody]Airport city)
        {
            await service.Update(id, city);

            Response.StatusCode = 202;
            return new NoContentResult();
        }

        // POST api/airports/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> Search([FromBody]AirportSearchOptions searchOptions)
        {
            var foundAirports = await service.Search(searchOptions);

            if (foundAirports != null)
            {
                Response.StatusCode = 200;
                return new ObjectResult(foundAirports);
            }

            return new NoContentResult();
        }
    }
}