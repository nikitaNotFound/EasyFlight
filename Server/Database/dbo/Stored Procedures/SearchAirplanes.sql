create procedure [dbo].[SearchAirplanes]
    @nameFilter as nvarchar(50) = '',
    @minCarryingKg as int = 0,
    @maxCarryingKg as int = 2147483647,
    @minSeatCount as int = 0,
    @maxSeatCount as int = 2147483647
as
    select *
    from Airplanes
        inner join (select COUNT(Seats.Id) as SeatCount, AirplaneId from Seats group by AirplaneId) AirplaneSeatCount
            on Airplanes.Id = AirplaneSeatCount.AirplaneId
    where
        (@nameFilter is null or Name like @nameFilter + '%')
        and (@minCarryingKg is null or CarryingKg >= @minCarryingKg)
        and (@maxCarryingKg is null or CarryingKg <= @maxCarryingKg)
        and (@minSeatCount is null or SeatCount >= @minSeatCount)
        and (@maxSeatCount is null or SeatCount <= @maxSeatCount)