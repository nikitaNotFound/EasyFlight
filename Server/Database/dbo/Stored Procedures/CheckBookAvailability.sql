create procedure CheckBookAvailability
    @flightId as int,
    @seatId as int,
    @bookExpirationTimeInSeconds as int
as
    select top 1 1
    from FlightSeatsInfo
    where FlightId = @flightId
        and SeatId = @seatId
        and datediff(second, BookTime, SYSDATETIMEOFFSET()) > @bookExpirationTimeInSeconds
go