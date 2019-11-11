create procedure [dbo].[GetAccountFlights]
    @accountId as int,
    @finalBookType as int
as
    select FlightId, SeatId
    from FlightSeatsInfo
        full outer join Flights
            on Flights.Id = FlightId
    where AccountId = @accountId
        and BookType = @finalBookType