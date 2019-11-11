using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Booking
{
    public interface IBookingService
    {
        Task<ResultTypes> BookForTimeAsync(FlightBookInfo bookInfo);
        Task<ResultTypes> BookAsync(FlightBookInfo bookInfo, string transaction);
        Task<IReadOnlyCollection<FlightBookInfo>> GetFlightBookInfoAsync(int flightId);
        Task<IReadOnlyCollection<AccountBook>> GetAccountBooks();
    }
}