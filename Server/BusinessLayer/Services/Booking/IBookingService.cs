using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Booking
{
    public interface IBookingService
    {
        Task<AddResult> BookForTimeAsync(FlightBookInfo bookInfo);
        Task<ResultTypes> FinalBookAsync(int bookId, string transaction);
        Task<IReadOnlyCollection<SeatBook>> GetFlightBookedSeatsAsync(int flightId);
        Task<IReadOnlyCollection<FlightBookInfo>> GetAccountFlightsInfoAsync();
        Task<IReadOnlyCollection<SeatBook>> GetBookSeatsAsync(int bookId);
    }
}