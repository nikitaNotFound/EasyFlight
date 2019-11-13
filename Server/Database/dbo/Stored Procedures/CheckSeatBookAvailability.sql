create procedure [dbo].[CheckSeatBookAvailability]
    @flightId as int,
    @seatId as int,
    @bookExpirationTimeInSeconds as int,
    @timeUntilBookingAvailableInSeconds as int,
    @finalBookType as int
as
    select top 1 1
    from FlightSeatsInfo fsi
        cross apply (
            select BookType, BookTime, FlightId
            from FlightBooksInfo fbi
            where fsi.FlightBookInfoId = fbi.Id
        ) fbi
        cross apply (
            select DepartureTime
            from Flights f
            where fbi.FlightId = f.Id
        ) f
    where fbi.FlightId = @flightId
        and fsi.SeatId = @seatId
        and (datediff(second, fbi.BookTime, SYSDATETIMEOFFSET()) <= @bookExpirationTimeInSeconds
            or fbi.BookType = @finalBookType)
        and datediff(second, f.DepartureTime, SYSDATETIMEOFFSET()) >= @timeUntilBookingAvailableInSeconds