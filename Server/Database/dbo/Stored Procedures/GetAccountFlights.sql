create procedure [dbo].[GetAccountFlights]
    @accountId as int,
    @finalBookType as int
as
    select distinct *
    from FlightSeatsInfo
        inner join Flights
            on Flights.Id = FlightId
    where AccountId = @accountId
        and BookType = @finalBookType