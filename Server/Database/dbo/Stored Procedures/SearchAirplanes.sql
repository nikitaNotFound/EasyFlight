create procedure [dbo].[SearchAirplanes]
    @nameFilter as nvarchar(50) = '',
    @minCarryingKg as int = 0,
    @maxCarryingKg as int = 2147483647,
    @minSeatCount as int = 0,
    @maxSeatCount as int = 2147483647
as
    select *
    from Airplanes
    where Name like @nameFilter + '%'
        and CarryingKg between @minCarryingKg and @maxCarryingKg
        and (select COUNT(Id) from Seats where AirplaneId = Id) between @minSeatCount and @maxSeatCount