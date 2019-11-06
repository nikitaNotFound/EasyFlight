create procedure [dbo].[AddFlightSeatTypeCost]
    @flightId as int,
    @seatTypeId as int,
    @cost as int
as
    insert into FlightSeatTypesCost
    (
        FlightId,
        SeatTypeId,
        Cost
    )
    values
    (
        @flightId,
        @seatTypeId,
        @cost
    )

    select SCOPE_IDENTITY()