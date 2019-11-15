create procedure [dbo].[BookSeat]
    @seatId as int,
    @cost as int,
    @flightBookInfoId as int
as
    insert into FlightSeatsInfo
    (
        SeatId,
        Cost,
        FlightBookInfoId
    )
    values
    (
        @seatId,
        @cost,
        @flightBookInfoId
    )