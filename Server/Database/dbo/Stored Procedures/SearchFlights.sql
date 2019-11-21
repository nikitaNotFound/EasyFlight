﻿create procedure [dbo].[SearchFlights]
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
    select
        f.*,
        count (*) over () as TotalCount
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
                inner join FlightBooksInfo fbi
                    on fbi.Id = fsi.FlightBookInfoId
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
    order by f.Id
    offset (@currentPage - 1) * @pageLimit rows
    fetch next @pageLimit rows only

