using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Services.Booking;
using BusinessLayer.Services.Flights;
using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using BlFlight = BusinessLayer.Models.Flight;
using BlFlightFilter = BusinessLayer.Models.FlightFilter;
using BlFlightSeatTypeCost = BusinessLayer.Models.FlightSeatTypeCost;
using BlFlightBookInfo = BusinessLayer.Models.FlightBookInfo;
using BlSeatBook = BusinessLayer.Models.SeatBook;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;
        private readonly IBookingService _bookingService;
        private readonly IMapper _mapper;


        public FlightsController(IFlightService flightService, IBookingService bookingService, IMapper mapper)
        {
            _flightService = flightService;
            _bookingService = bookingService;
            _mapper = mapper;
        }


        // GET api/flights
        // {?fromAirportId}{?toAirportId}{?fromCityId}{?toCityId}
        // {?departureTime}{?arrivalTime}{?ticketCount}{?searchBack}
        [HttpGet]
        public async Task<IActionResult> GetAsync(
            int? fromAirportId,
            int? toAirportId,
            int? fromCityId,
            int? toCityId,
            DateTime? departureTime,
            DateTime? arrivalTime,
            int? ticketCount,
            bool searchBack
        )
        {
            IReadOnlyCollection<BlFlight> flightsBl;

            if (fromAirportId != null
                || toAirportId != null
                || fromCityId != null
                || toCityId != null
                || departureTime != null
                || arrivalTime != null
                || ticketCount != null
            )
            {
                FlightFilter filter = new FlightFilter(
                    fromAirportId,
                    toAirportId,
                    fromCityId,
                    toCityId,
                    departureTime,
                    arrivalTime,
                    ticketCount,
                    searchBack
                );

                BlFlightFilter filterBl = _mapper.Map<BlFlightFilter>(filter);

                flightsBl = await _flightService.SearchFlightsAsync(filterBl);
            }
            else
            {
                flightsBl = await _flightService.GetAllAsync();
            }

            IReadOnlyCollection<Flight> flights = flightsBl.Select(_mapper.Map<Flight>).ToList();

            return Ok(flights);
        }

        // GET api/flights/{id}
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetFlightByIdAsync(int id)
        {
            BlFlight flightBl = await _flightService.GetByIdAsync(id);

            Flight flight = _mapper.Map<Flight>(flightBl);

            if (flight == null)
            {
                return NotFound();
            }

            return Ok(flight);
        }

        // POST api/flights
        [HttpPost]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        public async Task<IActionResult> AddAsync([FromBody] Flight flight)
        {
            BlFlight flightBl = _mapper.Map<BlFlight>(flight);

            AddResult addResult = await _flightService.AddAsync(flightBl);

            switch (addResult.ResultType)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.InvalidData:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Ok(new { Id = addResult.ItemId });
        }

        // PUT api/flights
        [Authorize(Roles = nameof(AccountRole.Admin))]
        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Flight flight)
        {
            BlFlight flightBl = _mapper.Map<BlFlight>(flight);

            ResultTypes addResult = await _flightService.UpdateAsync(flightBl);

            switch (addResult)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.InvalidData:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Ok();
        }

        // GET api/flights/{id}/seat-types-cost
        [HttpGet]
        [Route("{flightId}/seat-types-cost")]
        public async Task<IActionResult> GetFlightSeatTypesCostAsync(int flightId)
        {
            IReadOnlyCollection<BlFlightSeatTypeCost> seatTypeCostsBl =
                await _flightService.GetFlightSeatTypesCost(flightId);

            IReadOnlyCollection<FlightSeatTypeCost> seatTypeCosts =
                seatTypeCostsBl.Select(_mapper.Map<FlightSeatTypeCost>).ToList();

            return Ok(seatTypeCosts);
        }

        // POST api/flights/{id}/seat-types-cost
        [HttpPost]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        [Route("{flightId}/seat-types-cost")]
        public async Task<IActionResult> AddFlightSeatTypeCostAsync(
            int flightId,
            [FromBody] FlightSeatTypeCost seatTypeCost
        )
        {
            BlFlightSeatTypeCost seatTypeCostBl = _mapper.Map<BlFlightSeatTypeCost>(seatTypeCost);
            seatTypeCostBl.FlightId = flightId;

            ResultTypes addResult = await _flightService.AddFlightSeatTypeCostAsync(seatTypeCostBl);

            switch (addResult)
            {
                case ResultTypes.NotFound:
                    return NotFound();
                case ResultTypes.Duplicate:
                    return BadRequest();
            }

            return Ok();
        }

        // PUT api/flights/{flightId}/seat-types-cost
        [HttpPut]
        [Authorize(Roles = nameof(AccountRole.Admin))]
        [Route("{flightId}/seat-types-cost")]
        public async Task<IActionResult> UpdateFlightSeatTypeCostAsync(
            int flightId,
            [FromBody] FlightSeatTypeCost seatTypeCost
        )
        {
            BlFlightSeatTypeCost seatTypeCostBl = _mapper.Map<BlFlightSeatTypeCost>(seatTypeCost);
            seatTypeCostBl.FlightId = flightId;

            ResultTypes addResult = await _flightService.UpdateFlightSeatTypeCostAsync(seatTypeCostBl);

            switch (addResult)
            {
                case ResultTypes.NotFound:
                    return NotFound();
                case ResultTypes.Duplicate:
                    return BadRequest();
            }

            return Ok();
        }

        // POST api/flights/books
        [HttpPost]
        [Route("books")]
        public async Task<IActionResult> BookForTimeAsync([FromBody] FlightBookInfo flightBookInfo)
        {
            BlFlightBookInfo flightBookInfoBl = _mapper.Map<BlFlightBookInfo>(flightBookInfo);

            AddResult bookResult = await _bookingService.BookForTimeAsync(flightBookInfoBl);

            switch (bookResult.ResultType)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Ok(new { Id = bookResult.ItemId });
        }

        // PUT api/flights/books/{bookId}{?transaction}
        [HttpPut]
        [Route("books/{bookId}")]
        public async Task<IActionResult> BookAsync(int flightId, int bookId, string transaction)
        {
            if (string.IsNullOrEmpty(transaction))
            {
                return BadRequest();
            }

            ResultTypes bookResult = await _bookingService.FinalBookAsync(bookId, transaction);

            switch (bookResult)
            {
                case ResultTypes.Duplicate:
                    return BadRequest();
                case ResultTypes.NotFound:
                    return NotFound();
            }

            return Ok();
        }

        // GET api/flights/{flightId}/booked-seats
        [HttpGet]
        [Route("{flightId}/booked-seats")]
        public async Task<IActionResult> GetFlightBookedSeatsAsync(int flightId)
        {
            IReadOnlyCollection<BlSeatBook> flightBookInfoBl =
                await _bookingService.GetFlightBookedSeatsAsync(flightId);

            IEnumerable<SeatBook> flightBookInfo =
                flightBookInfoBl.Select(_mapper.Map<SeatBook>);

            return Ok(flightBookInfo);
        }

        // GET api/flights/books/{bookId}/seats
        [HttpGet]
        [Route("books/{bookId}/seats")]
        public async Task<IActionResult> GetBookSeatsAsync(int bookId)
        {
            IReadOnlyCollection<BlSeatBook> seatsBl =
                await _bookingService.GetBookSeatsAsync(bookId);

            IEnumerable<SeatBook> seats =
                seatsBl.Select(_mapper.Map<SeatBook>);

            return Ok(seats);
        }

        // GET api/flights/books/me
        [HttpGet]
        [Route("books/me")]
        public async Task<IActionResult> GetAccountFlightsInfoAsync()
        {
            IReadOnlyCollection<BlFlightBookInfo> accountFlightsBl =
                await _bookingService.GetAccountFlightsInfoAsync();

            IEnumerable<FlightBookInfo> accountFlights = accountFlightsBl.Select(_mapper.Map<FlightBookInfo>);

            return Ok(accountFlights);
        }
    }
}