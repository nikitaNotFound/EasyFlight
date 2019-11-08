create procedure [dbo].[SearchFlights]
    @fromAirportId as int = null,
    @toAirportId as int = null,
    @fromCityId as int = null,
    @toCityId as int = null,
    @departureDate as date = null,
    @arrivalDate as date = null,
    @ticketCount as int = null
as
    select *
    from Flights
        inner join (select CityId as FromCityId, Id as AirId from Airports) FromAirports
            on Flights.FromAirportId = FromAirports.AirId
        inner join (select CityId as ToCityId, Id as AirId from Airports) ToAirports
            on Flights.ToAirportId = ToAirports.AirId
        cross apply (
            select COUNT(Seats.Id) as SeatCount
            from Seats
            where Seats.AirplaneId = Flights.AirplaneId
        ) TotalAirplaneSeats
        cross apply (
            select COUNT(FlightSeatsInfo.AccountId) as SeatCount
            from FlightSeatsInfo
            where FlightSeatsInfo.AirplaneId = Flights.AirplaneId
        ) BookedAirplaneSeats
    where
        (@fromAirportId is null or FromAirportId = @fromAirportId)
        and (@toAirportId is null or ToAirportId = @toAirportId)
        and (@fromCityId is null or FromCityId = @fromCityId)
        and (@toCityId is null or ToCityId = @toCityId)
        and (@departureDate is null or CAST(DepartureTime as date) = @departureDate)
        and (@arrivalDate is null or CAST(ArrivalTime as date) = @arrivalDate)
        and (@ticketCount is null or @ticketCount <= TotalAirplaneSeats.SeatCount - BookedAirplaneSeats.SeatCount)