using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AirplanesController : ControllerBase
    {
        private readonly IMapper _mapper;


        public AirplanesController(IMapper mapper)
        {
            _mapper = mapper;
        }


        // GET api/airplanes
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok();
        }

        // GET api/airplanes/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            return Ok();
        }

        // GET api/airplanes/{airplaneId}/seat-scheme
        [HttpGet]
        [Route("{airplaneId}/seats")]
        public async Task<ActionResult> GetAirplaneSeatsAsync(int airplaneId)
        {
            return Ok();
        }

        // GET api/airplanes/{airplaneId}/seat-types
        [HttpGet]
        [Route("{airplaneId}/seat-types")]
        public async Task<ActionResult> GetAirplaneSeatTypesAsync(int airplaneId)
        {
            return Ok();
        }

        // POST api/airplanes/searches
        [HttpPost]
        public async Task<ActionResult> SearchAirplanes([FromBody] AirplaneFilter airplaneFilter)
        {

            return Ok();
        }

        // POST api/airplanes
        [HttpPost]
        public async Task<ActionResult> AddAirplaneAsync([FromBody] Airplane airplane)
        {
            return Ok();
        }

        // POST api/airplanes/{airplaneId}/seat-types
        [HttpGet]
        [Route("{airplaneId}/seat-types")]
        public async Task<ActionResult> AddAirplaneSeatTypeAsync(int airplaneId)
        {
            return Ok();
        }

        // POST api/airplanes/{airplaneId}/seat-scheme
        [HttpGet]
        [Route("{airplaneId}/seats")]
        public async Task<ActionResult> AddAirplaneSeatAsync(int airplaneId)
        {
            return Ok();
        }
    }
}