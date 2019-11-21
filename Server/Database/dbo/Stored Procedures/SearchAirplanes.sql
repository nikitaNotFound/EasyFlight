﻿create procedure [dbo].[SearchAirplanes]
    @nameFilter as nvarchar(50) = null,
    @minCarryingKg as int = null,
    @maxCarryingKg as int = null,
    @minSeatCount as int = null,
    @maxSeatCount as int = null,
    @currentPage as int,
    @pageLimit as int
as
    select
        count(*) over ()  as TotalCount,
        A1.*
    from Airplanes A1
        cross apply (
            select COUNT(Seats.Id) as SeatCount
            from Seats
            where Seats.AirplaneId = A1.Id
        ) AirplanesWithSeatCount
    where
        (@nameFilter is null or A1.Name like @nameFilter + '%')
        and (@minCarryingKg is null or A1.CarryingKg >= @minCarryingKg)
        and (@maxCarryingKg is null or A1.CarryingKg <= @maxCarryingKg)
        and (@minSeatCount is null or AirplanesWithSeatCount.SeatCount >= @minSeatCount)
        and (@maxSeatCount is null or AirplanesWithSeatCount.SeatCount <= @maxSeatCount)
    order by Id
    offset (@currentPage - 1) * @pageLimit rows
    fetch next @pageLimit rows only

