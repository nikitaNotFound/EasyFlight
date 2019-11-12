﻿using System;
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
        public async Task<AddResult> BookForTimeAsync(FlightBookInfo bookInfo)
        {
            FlightEntity flight = await _flightRepository.GetByIdAsync(bookInfo.FlightId);

            if (flight == null)
            {
                return new AddResult(ResultTypes.NotFound, null);
            }

            for (int seatBookIndex = 0; seatBookIndex < bookInfo.SeatBooks.Length; seatBookIndex ++)
            {
                SeatBook seatBook = bookInfo.SeatBooks[seatBookIndex];

                AirplaneSeatEntity seat = await _airplaneRepository.GetSeatById(seatBook.SeatId);

                if (seat == null)
                {
                    return new AddResult(ResultTypes.NotFound, null);
                }

                bool canBook = await _flightRepository.CheckSeatBookAvailabilityAsync(
                    bookInfo.FlightId,
                    seatBook.SeatId,
                    _bookingSettings.ExpirationTime);

                if (!canBook)
                {
                    return new AddResult(ResultTypes.Duplicate, null);
                }
            }

            bookInfo.BookType = BookType.AwaitingPayment;
            bookInfo.BookTime = DateTimeOffset.Now;
            bookInfo.AccountId = _accountId;

            FlightBookInfoEntity bookInfoDal = _mapper.Map<FlightBookInfoEntity>(bookInfo);

            int accountFlightInfoId = await _flightRepository.AddAccountFlightInfoAsync(bookInfoDal);

            foreach (SeatBook seatBook in bookInfo.SeatBooks)
            {
                seatBook.FlightBookInfoId = accountFlightInfoId;
                SeatBookEntity seatBookDal = _mapper.Map<SeatBookEntity>(seatBook);
                await _flightRepository.BookSeatAsync(seatBookDal);
            }

            return new AddResult(ResultTypes.Ok, accountFlightInfoId);;
        }

        public async Task<ResultTypes> FinalBookAsync(int flightId, int bookId, string transaction)
        {
            bool canBook = await _flightRepository.CheckFinalBookAvailabilityAsync(
                flightId,
                _accountId,
                _bookingSettings.ExpirationTime
            );

            if (!canBook)
            {
                return ResultTypes.NotFound;
            }

            if (!TransactionValidator.CheckTransaction(transaction))
            {
                return ResultTypes.NotFound;
            }

            await _flightRepository.FinalBookAsync(flightId, _accountId, bookId);

            return ResultTypes.Ok;
        }

        public async Task<IReadOnlyCollection<SeatBook>> GetFlightBookedSeatsAsync(int flightId)
        {
            IReadOnlyCollection<SeatBookEntity> flightBookInfoDal =
                await _flightRepository.GetFlightBookedSeatsAsync(flightId, _bookingSettings.ExpirationTime);

            return flightBookInfoDal.Select(_mapper.Map<SeatBook>).ToList();
        }

        public async Task<IReadOnlyCollection<FlightBookInfo>> GetAccountFlightsInfoAsync()
        {
            IReadOnlyCollection<FlightBookInfoEntity> flightsDal =
                await _flightRepository.GetAccountFlightsInfoAsync(_accountId);

            return flightsDal.Select(_mapper.Map<FlightBookInfo>).ToList();
        }

        public async Task<IReadOnlyCollection<SeatBook>> GetFlightBookedSeatsByBookIdAsync(int bookId)
        {
            IReadOnlyCollection<SeatBookEntity> seatsDal =
                await _flightRepository.GetFlightBookedSeatsByBookIdAsync(bookId);

            return seatsDal.Select(_mapper.Map<SeatBook>).ToList();
        }
    }
}