create procedure UpdateFlightSeatTypeCost
    @flightId as int,
    @seatTypeId as int,
    @cost as int
as
    update FlightSeatTypesCost
    set Cost = @cost
    where FlightId = @flightId
        and SeatTypeId = @seatTypeId