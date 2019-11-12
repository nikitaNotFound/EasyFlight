create procedure UpdateFlight
    @flightId as int,
    @fromAirportId as int,
    @toAirportId as int,
    @departureTime as datetimeoffset(7),
    @arrivalTime as datetimeoffset(7),
    @airplaneId as int,
    @suitcaseMassKg as int,
    @suitcaseCount as int,
    @handLuggageMassKg as int,
    @handLuggageCount as int,
    @massOverloadKgCost as int
as
    update Flights
    set FromAirportId = @fromAirportId,
        ToAirportId = @toAirportId,
        DepartureTime = @departureTime,
        ArrivalTime = @arrivalTime,
        AirplaneId = @airplaneId,
        SuitcaseMassKg = @suitcaseMassKg,
        SuitcaseCount = @suitcaseCount,
        HandLuggageMassKg = @handLuggageMassKg,
        HandLuggageCount = @handLuggageCount,
        MassOverloadKgCost = @massOverloadKgCost
    where Id = @flightId