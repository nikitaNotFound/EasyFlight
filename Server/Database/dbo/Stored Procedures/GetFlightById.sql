create procedure GetFlightById
    @id as int
as
    select *
    from Flights
    where Id = @id