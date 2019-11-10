create procedure BookSeat
    @flightId as int,
    @seatId as int,
    @accountId as int,
    @bookTime as datetimeoffset(7),
    @bookType as int
as
    insert into FlightSeatsInfo
    (
        FlightId,
        SeatId,
        AccountId,
        BookTime,
        BookType
    )
    values
    (
        @flightId,
        @seatId,
        @accountId,
        @bookTime,
        @bookType
    )