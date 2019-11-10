create procedure CheckFinalBookAvailability
    @flightId as int,
    @seatId as int,
    @bookExpirationTimeInSeconds as int,
    @accountId as int,
    @validBookType as int
as
    select top 1 1
    from FlightSeatsInfo
    where FlightId = @flightId
        and SeatId = @seatId
        and datediff(second, BookTime, SYSDATETIMEOFFSET()) < @bookExpirationTimeInSeconds
        and BookType = @validBookType
        and Accountid = @accountId
go