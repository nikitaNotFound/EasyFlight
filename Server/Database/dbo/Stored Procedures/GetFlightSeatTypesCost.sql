create procedure GetFlightSeatTypesCost
    @flightId as int
as
    select *
    from FlightSeatTypesCost
    where FlightId = @flightId