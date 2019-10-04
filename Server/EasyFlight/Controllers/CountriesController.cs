using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Countries;
using Microsoft.AspNetCore.Cors;
using BusinessLayer.Services.Countries;
using BlCountry = BusinessLayer.Models.Countries.Country;
using BlCountrySearchOptions = BusinessLayer.Models.Countries.CountrySearchOptions;
using BusinessLayer;
using AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllToUrlFromConfig")]
    public class CountriesController : ControllerBase
    {
        private ICountryService countryService;
        private IMapper mapper;

        public CountriesController(ICountryService countryService, IMapper mapper)
        {
            this.countryService = countryService;
            this.mapper = mapper;
        }


        // GET api/countries/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            BlCountry foundCountryBl = await countryService.GetByIdAsync(id);

            Country foundCountry = mapper.Map<Country>(foundCountryBl);

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
            BlCountry countryBl = mapper.Map<BlCountry>(country);

            ResultTypes addResult = await countryService.AddAsync(countryBl);

            if (addResult == ResultTypes.Dublicate)
            {
                string message = $"{countryBl.Name} already exists!";
                Response.StatusCode = 409;
                return new JsonResult(new ErrorInfo(message));
            }

            return new StatusCodeResult(201);
        }

        // PUT api/countries/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] Country country)
        {
            BlCountry countryBl = mapper.Map<BlCountry>(country);

            ResultTypes updateResult = await countryService.UpdateAsync(id, countryBl);

            switch (updateResult)
            {
                case ResultTypes.NotFound:
                    return new NotFoundResult();

                case ResultTypes.UpdatingNameExists:
                    Response.StatusCode = 409;
                    return new JsonResult(new ErrorInfo("Such name already exists!"));
            }

            return new StatusCodeResult(202);
        }

        // POST api/countries/searches
        [HttpPost]
        [Route("searches")]
        public async Task<ActionResult> SearchAsync([FromBody] CountrySearchOptions searchOptions)
        {
            var searchOptionsBl = mapper.Map<BlCountrySearchOptions>(searchOptions);

            var foundCountries = await countryService.SearchAsync(searchOptionsBl);

            return new ObjectResult(foundCountries);
        }
    }
}