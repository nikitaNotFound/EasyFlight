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


        // GET api/countries{?nameFilter}
        [HttpGet]
        public async Task<ActionResult> GetAsync(string nameFilter)
        {
            IReadOnlyCollection<BlCountry> countriesBl;

            if (string.IsNullOrEmpty(nameFilter))
            {
                countriesBl = await _countryService.GetAllAsync();
            }
            else
            {
                countriesBl = await _countryService.SearchByNameAsync(nameFilter);
            }

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

        // GET api/countries/{countryId}/cities{?nameFilter}
        [HttpGet]
        [Route("{countryId}/cities")]
        public async Task<ActionResult> GetCitiesAsync(int countryId, string nameFilter)
        {
            IReadOnlyCollection<BlCity> citiesBl;

            if (string.IsNullOrEmpty(nameFilter))
            {
                citiesBl = await _countryService.GetCountryCitiesAsync(countryId);
            }
            else
            {
                citiesBl = await _countryService.SearchCountryCitiesByNameAsync(countryId, nameFilter);
            }

            IEnumerable<City> cities = citiesBl.Select(_mapper.Map<City>) ;

            return Ok(cities);
        }

        // POST api/countries
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] Country country)
        {
            BlCountry countryBl = _mapper.Map<BlCountry>(country);

            ResultTypes addResult = await _countryService.AddAsync(countryBl);

            if (addResult == ResultTypes.Duplicate)
            {
                return BadRequest();
            }

            return Ok();
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

                case ResultTypes.Duplicate:
                    return BadRequest();
            }

            return Ok();
        }
    }
}