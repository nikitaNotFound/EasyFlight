using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.AspNetCore.Cors;
using BusinessLayer.Services.Countries;
using BlCountry = BusinessLayer.Models.Country;
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
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService _countryService;
        private readonly IMapper _mapper;


        public CountriesController(ICountryService countryService, IMapper mapper)
        {
            _countryService = countryService;
            _mapper = mapper;
        }


        // GET api/countries
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            IEnumerable<BlCountry> countriesBl = await _countryService.GetAllAsync();

            IEnumerable<Country> countries = countriesBl.Select(_mapper.Map<Country>);

            return Ok(countries);
        }

        // GET api/countries/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            BlCountry foundCountryBl = await _countryService.GetByIdAsync(id);

            Country foundCountry = _mapper.Map<Country>(foundCountryBl);

            if (foundCountry != null)
            {
                return Ok(foundCountry);
            }

            return NotFound();
        }

        // GET api/countries/filters{?name}
        [HttpGet]
        [Route("filters")]
        public async Task<ActionResult> GetAsync(string name)
        {
            IEnumerable<BlCountry> countriesBl = await _countryService.GetByNameAsync(name);

            IEnumerable<Country> countries = countriesBl.Select(_mapper.Map<Country>);

            return Ok(countries);
        }

        // GET api/countries/{id}/cities
        [HttpGet]
        [Route("{id}/cities")]
        public async Task<ActionResult> GetCities(int id)
        {
            IEnumerable<BlCity> citiesBl = await _countryService.GetCitiesAsync(id);

            IEnumerable<City> cities = citiesBl.Select(_mapper.Map<City>) ;

            return Ok(cities);
        }

        // GET api/countries/{id}/cities{name}
        [HttpGet]
        [Route("{id}/cities/{name}")]
        public async Task<ActionResult> GetCitiesByName(int id, string name)
        {
            IEnumerable<BlCity> citiesBl = await _countryService.GetCitiesByNameAsync(id, name);

            IEnumerable<City> cities = citiesBl.Select(_mapper.Map<City>);

            return Ok(cities);
        }

        // POST api/countries
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] Country country)
        {
            BlCountry countryBl = _mapper.Map<BlCountry>(country);

            ResultTypes addResult = await _countryService.AddAsync(countryBl);

            if (addResult == ResultTypes.Dublicate)
            {
                string message = $"{countryBl.Name} already exists!";
                return BadRequest(message);
            }

            return StatusCode(201);
        }

        // PUT api/countries
        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] Country country)
        {
            BlCountry countryBl = _mapper.Map<BlCountry>(country);

            ResultTypes updateResult = await _countryService.UpdateAsync(countryBl);

            switch (updateResult)
            {
                case ResultTypes.NotFound:
                    return NotFound();

                case ResultTypes.Dublicate:
                    string message = "Such name already exists!";
                    return BadRequest(message);
            }

            return StatusCode(202);
        }
    }
}