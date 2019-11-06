create procedure [dbo].[SearchAirplanes]
    @nameFilter as nvarchar(50) = null,
    @minCarryingKg as int = null,
    @maxCarryingKg as int = null,
    @minSeatCount as int = null,
    @maxSeatCount as int = null
as
    select *
    from Airplanes A1
        cross apply (
            select COUNT(Seats.Id) as SeatCount
            from Seats
                join Airplanes A2 on Seats.AirplaneId = A2.Id
            where Seats.AirplaneId = A1.Id
        ) AirplanesWithSeatCount
    where
        (@nameFilter is null or A1.Name like @nameFilter + '%')
        and (@minCarryingKg is null or A1.CarryingKg >= @minCarryingKg)
        and (@maxCarryingKg is null or A1.CarryingKg <= @maxCarryingKg)
        and (@minSeatCount is null or AirplanesWithSeatCount.SeatCount >= @minSeatCount)
        and (@maxSeatCount is null or AirplanesWithSeatCount.SeatCount <= @maxSeatCount)