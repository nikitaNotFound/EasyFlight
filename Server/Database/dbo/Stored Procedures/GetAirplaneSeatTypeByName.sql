create procedure GetAirplaneSeatTypeByName
    @airplaneId as int,
    @name as nvarchar(50)
as
    select *
    from SeatTypes
    where AirplaneId = @airplaneId
        and Name = @name