create procedure CheckFlightSeatTypeCostDuplicate
    @flightId as int,
    @seatTypeId as int
as
    select *
    from FlightSeatTypesCost
    where FlightId = @flightId
        and SeatTypeId = @seatTypeId
