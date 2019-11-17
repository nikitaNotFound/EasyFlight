﻿create procedure [dbo].[SearchAirplanes]
    @nameFilter as nvarchar(50) = null,
    @minCarryingKg as int = null,
    @maxCarryingKg as int = null,
    @minSeatCount as int = null,
    @maxSeatCount as int = null,
    @currentPage as int,
    @pageLimit as int
as
    select *
    from (
        select row_number() over(order by Id) as row, A1.*
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
    ) t1
    where t1.row between (@currentPage - 1) * @pageLimit + 1 and (@currentPage - 1) * @pageLimit + @pageLimit

    select @@rowcount

