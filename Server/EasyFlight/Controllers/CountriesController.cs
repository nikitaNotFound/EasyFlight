using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Countries;
using Microsoft.AspNetCore.Cors;
using BusinessLayer.Services.Countries;
using BlCountry = BusinessLayer.Models.Countries.Country;
using BlCountrySearchOptions = BusinessLayer.Models.Countries.CountrySearchOptions;
using BusinessLayer;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllToUrlFromConfig")]
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

            return new ObjectResult(countries);
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
                return new ObjectResult(foundCountry);
            }

            return new NotFoundResult();
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
                Response.StatusCode = 400;
                return new JsonResult(new ErrorInfo(message));
            }

            return new StatusCodeResult(201);
        }

        // PUT api/countries/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] Country country)
        {
            BlCountry countryBl = _mapper.Map<BlCountry>(country);
            countryBl.Id = id;

            ResultTypes updateResult = await _countryService.UpdateAsync(countryBl);

            switch (updateResult)
            {
                case ResultTypes.NotFound:
                    return new NotFoundResult();

                case ResultTypes.UpdatingNameExists:
                    Response.StatusCode = 400;
                    return new JsonResult(new ErrorInfo("Such name already exists!"));
            }

            return new StatusCodeResult(202);
        }

        // POST api/countries/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> SearchAsync([FromBody] CountrySearchOptions searchOptions)
        {
            var searchOptionsBl = _mapper.Map<BlCountrySearchOptions>(searchOptions);

            var foundCountries = await _countryService.SearchAsync(searchOptionsBl);

            return new ObjectResult(foundCountries);
        }
    }
}