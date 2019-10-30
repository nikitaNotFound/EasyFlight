create procedure GetAirplaneSeatTypes
    @airplaneId as int
as
    select *
    from SeatTypes
    where AirplaneId = @airplaneId