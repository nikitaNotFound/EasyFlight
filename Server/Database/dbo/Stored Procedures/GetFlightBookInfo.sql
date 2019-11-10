create procedure GetFlightBookInfo
    @flightId as int,
    @bookExpirationTimeInSeconds as int,
    @finalBookType as int
as
    select *
    from FlightSeatsInfo
    where FlightId = @flightId
        and (datediff(second, BookTime, SYSDATETIMEOFFSET()) < @bookExpirationTimeInSeconds
            or BookType = @finalBookType)