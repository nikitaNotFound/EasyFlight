create procedure AddFlight
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
    insert into Flights
    (
        FromAirportId,
        ToAirportId,
        DepartureTime,
        ArrivalTime,
        AirplaneId,
        SuitcaseMassKg,
        SuitcaseCount,
        HandLuggageMassKg,
        HandLuggageCount,
        MassOverloadKgCost
    )
    values
    (
        @fromAirportId,
        @toAirportId,
        @departureTime,
        @arrivalTime,
        @airplaneId,
        @suitcaseMassKg,
        @suitcaseCount,
        @handLuggageMassKg,
        @handLuggageCount,
        @massOverloadKgCost
    )

    select SCOPE_IDENTITY()