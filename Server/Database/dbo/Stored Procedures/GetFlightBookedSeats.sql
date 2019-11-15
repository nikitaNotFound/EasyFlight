create procedure [dbo].[GetFlightBookedSeats]
    @flightId as int,
    @bookExpirationTimeInSeconds as int,
    @finalBookType as int
as
    select *
    from FlightSeatsInfo fsi
        cross apply (
            select BookType, BookTime, FlightId
            from FlightBooksInfo fbi
            where fsi.FlightBookInfoId = fbi.Id
        ) fbi
    where fbi.FlightId = @flightId
        and (datediff(second, fbi.BookTime, SYSDATETIMEOFFSET()) < @bookExpirationTimeInSeconds
            or fbi.BookType = @finalBookType)