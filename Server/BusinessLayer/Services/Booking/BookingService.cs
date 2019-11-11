using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Models;
using Common;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Airplanes;
using DataAccessLayer.Repositories.Airports;
using DataAccessLayer.Repositories.Flights;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Services.Booking
{
    public class BookingService : IBookingService
    {
        private readonly IMapper _mapper;
        private readonly IFlightRepository _flightRepository;
        private readonly IAirplaneRepository _airplaneRepository;
        private readonly IBookingSettings _bookingSettings;
        private readonly int _accountId;


        public BookingService(
            IMapper mapper,
            IFlightRepository flightRepository,
            IAirportRepository airportRepository,
            IAirplaneRepository airplaneRepository,
            IBookingSettings bookingSettings,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _mapper = mapper;
            _flightRepository = flightRepository;
            _airplaneRepository = airplaneRepository;
            _bookingSettings = bookingSettings;

            ClaimsIdentity claimsIdentity = httpContextAccessor?.HttpContext.User.Identity as ClaimsIdentity;

            if (claimsIdentity == null)
            {
                return;
            }

            string nameIdentifier =
                claimsIdentity?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(nameIdentifier))
            {
                _accountId = int.Parse(nameIdentifier);
            }
        }
        public async Task<ResultTypes> BookForTimeAsync(FlightBookInfo bookInfo)
        {
            FlightEntity flight = await _flightRepository.GetByIdAsync(bookInfo.FlightId);

            if (flight == null)
            {
                return ResultTypes.NotFound;
            }

            AirplaneSeatEntity seat = await _airplaneRepository.GetSeatById(bookInfo.SeatId);

            if (seat == null)
            {
                return ResultTypes.NotFound;
            }

            bool canBook = await _flightRepository.CheckBookAvailability(
                bookInfo.FlightId,
                bookInfo.SeatId,
                _bookingSettings.ExpirationTime);

            if (!canBook)
            {
                return ResultTypes.Duplicate;
            }

            bookInfo.AccountId = _accountId;
            bookInfo.BookTime = DateTimeOffset.Now;
            bookInfo.BookType = BookType.AwaitingPayment;

            FlightBookInfoEntity bookInfoDal = _mapper.Map<FlightBookInfoEntity>(bookInfo);

            await _flightRepository.BookAsync(bookInfoDal);

            return ResultTypes.Ok;
        }

        public async Task<ResultTypes> BookAsync(FlightBookInfo bookInfo, string transaction)
        {
            FlightBookInfoEntity bookInfoDal = _mapper.Map<FlightBookInfoEntity>(bookInfo);

            bool canBook =
                await _flightRepository.CheckFinalBookAvailability(bookInfoDal, _bookingSettings.ExpirationTime);

            if (!canBook)
            {
                return ResultTypes.NotFound;
            }

            if (!TransactionValidator.CheckTransaction(transaction))
            {
                return ResultTypes.NotFound;
            }

            return ResultTypes.Ok;
        }

        public async Task<IReadOnlyCollection<FlightBookInfo>> GetFlightBookInfoAsync(int flightId)
        {
            IReadOnlyCollection<FlightBookInfoEntity> flightBookInfoDal =
                await _flightRepository.GetFlightBookInfo(flightId, _bookingSettings.ExpirationTime);

            return flightBookInfoDal.Select(_mapper.Map<FlightBookInfo>).ToList();
        }

        public async Task<IReadOnlyCollection<Flight>> GetAccountFlights()
        {
            IReadOnlyCollection<FlightEntity> flightsDal = await _flightRepository.GetAccountFlights(_accountId);

            return flightsDal.Select(_mapper.Map<Flight>).ToList();
        }
    }
}