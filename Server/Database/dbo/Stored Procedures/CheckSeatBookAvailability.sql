create procedure [dbo].[CheckSeatBookAvailability]
    @flightId as int,
    @seatId as int,
    @bookExpirationTimeInSeconds as int,
    @timeUntilBookingAvailableInSeconds as int,
    @finalBookType as int
as
    select top 1 1
    from FlightSeatsInfo fsi
        inner join FlightBooksInfo fbi
            on fsi.FlightBookInfoId = fbi.Id
        inner join Flights f
            on f.Id = fbi.FlightId
    where fbi.FlightId = @flightId
        and fsi.SeatId = @seatId
        and (datediff(second, fbi.BookTime, SYSDATETIMEOFFSET()) <= @bookExpirationTimeInSeconds
            or fbi.BookType = @finalBookType)
        and datediff(second, f.DepartureTime, SYSDATETIMEOFFSET()) >= @timeUntilBookingAvailableInSeconds