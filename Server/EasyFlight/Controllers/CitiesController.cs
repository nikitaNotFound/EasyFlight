using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Cities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using BusinessLayer.Services.Cities;
using BlCity = BusinessLayer.Models.Cities.City;
using BlCitySearchOptions = BusinessLayer.Models.Cities.CitySearchOptions;
using BusinessLayer;
using AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllToUrlFromConfig")]
    public class CitiesController : ControllerBase
    {
        private ICityService cityService;
        private IMapper mapper;

        public CitiesController(ICityService cityService, IMapper mapper)
        {
            this.cityService = cityService;
            this.mapper = mapper;
        }


        // GET api/cities/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            BlCity blCity = await cityService.GetByIdAsync(id);

            var city = mapper.Map<City>(blCity);

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
            var cityBl = mapper.Map<BlCity>(city);

            ResultTypes addingResult = await cityService.AddAsync(cityBl);

            if (addingResult == ResultTypes.Dublicate)
            {
                string message = $"{city.Name} already exists!";
                Response.StatusCode = 409;
                return new JsonResult(new ErrorInfo(message));
            }
    
            return new StatusCodeResult(201);
        }

        // PUT api/cities/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] City city)
        {
            var citBl = mapper.Map<City, BlCity>(city);

            ResultTypes updatingResult = await cityService.UpdateAsync(id, citBl);

            switch (updatingResult)
            {
                case ResultTypes.NotFound:
                    return new NotFoundResult();

                case ResultTypes.UpdatingNameExists:
                    Response.StatusCode = 409;
                    return new JsonResult(new ErrorInfo("Such name already exists!"));
            }

            return new AcceptedResult();
        }

        // POST api/cities/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> SearchAsync([FromBody] CitySearchOptions searchOptions)
        {
            var searchOptionsBl = mapper.Map<CitySearchOptions, BlCitySearchOptions>(searchOptions);

            var foundCities = await cityService.SearchAsync(searchOptionsBl);

            return new ObjectResult(foundCities);
        }
    }
}