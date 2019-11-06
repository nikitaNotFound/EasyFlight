create procedure GetAirplaneSeats
    @airplaneId as int
as
    select *
    from Seats
    where AirplaneId = @airplaneId