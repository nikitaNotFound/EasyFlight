using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using BusinessLayer.Services.Cities;
using BlCity = BusinessLayer.Models.City;
using BusinessLayer;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;
        private readonly IMapper _mapper;


        public CitiesController(ICityService cityService, IMapper mapper)
        {
            _cityService = cityService;
            _mapper = mapper;
        }
            

        // GET api/cities
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            IEnumerable<BlCity> citiesBl = await _cityService.GetAllAsync();

            IEnumerable<City> cities = citiesBl.Select(_mapper.Map<City>);

            return new ObjectResult(cities);
        }

        // GET api/cities/{id}
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            BlCity blCity = await _cityService.GetByIdAsync(id);

            City city = _mapper.Map<City>(blCity);

            if (city != null)
            {
                return new ObjectResult(city);
            }

            return new NotFoundResult();
        }

        // POST api/cities
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] City city)
        {
            var cityBl = _mapper.Map<BlCity>(city);

            ResultTypes addingResult = await _cityService.AddAsync(cityBl);

            if (addingResult == ResultTypes.Dublicate)
            {
                string message = $"{city.Name} already exists!";
                return new BadRequestObjectResult(new ErrorInfo(message));
            }
    
            return new StatusCodeResult(201);
        }

        // PUT api/cities/{id}
        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] City city)
        {
            var cityBl = _mapper.Map<City, BlCity>(city);

            ResultTypes updatingResult = await _cityService.UpdateAsync(cityBl);

            switch (updatingResult)
            {
                case ResultTypes.NotFound:
                    return new NotFoundResult();

                case ResultTypes.Dublicate:
                    return new BadRequestObjectResult(new ErrorInfo("Such name already exists!"));
            }

            return new AcceptedResult();
        }
    }
}