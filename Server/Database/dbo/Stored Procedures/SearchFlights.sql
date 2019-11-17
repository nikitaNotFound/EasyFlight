create procedure [dbo].[SearchFlights]
    @fromAirportId as int = null,
    @toAirportId as int = null,
    @fromCityId as int = null,
    @toCityId as int = null,
    @departureDate as date = null,
    @arrivalDate as date = null,
    @ticketCount as int = null,
    @bookExpirationTimeInSeconds as int,
    @timeUntilBookingAvailableInSeconds as int,
    @finalBookType as int,
    @currentPage as int,
    @pageLimit as int
as
    select *
    from (
        select row_number() over (order by f.Id) as row, f.*
        from Flights f
            inner join Airports fa
                on f.FromAirportId = fa.Id
            inner join Airports ta
                on f.ToAirportId = ta.Id
            cross apply (
                select COUNT(Seats.Id) as SeatCount
                from Seats
                where Seats.AirplaneId = f.AirplaneId
            ) tas
            cross apply (
                select COUNT(fsi.SeatId) as SeatCount
                from FlightSeatsInfo fsi
                cross apply (
                    select BookType, BookTime, FlightId
                    from FlightBooksInfo fbi
                    where fsi.FlightBookInfoId = fbi.Id
                ) fbi
            where fbi.FlightId = f.Id
                and (fbi.BookType = @finalBookType
                    or datediff(second, fbi.BookTime, SYSDATETIMEOFFSET()) < @bookExpirationTimeInSeconds)
            ) BookedAirplaneSeats
        where
            (@fromAirportId is null or FromAirportId = @fromAirportId)
            and (@toAirportId is null or ToAirportId = @toAirportId)
            and (@fromCityId is null or fa.CityId = @fromCityId)
            and (@toCityId is null or ta.CityId = @toCityId)
            and (@departureDate is null or CAST(DepartureTime as date) = @departureDate)
            and (@arrivalDate is null or CAST(ArrivalTime as date) = @arrivalDate)
            and (@ticketCount is null or @ticketCount <= tas.SeatCount - BookedAirplaneSeats.SeatCount)
            and datediff(second, f.DepartureTime, SYSDATETIMEOFFSET()) <= @timeUntilBookingAvailableInSeconds
    ) t1
    where t1.row between (@currentPage - 1) * @pageLimit + 1 and (@currentPage - 1) * @pageLimit + @pageLimit

    select @@rowcount

