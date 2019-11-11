create procedure BookSeat
    @flightId as int,
    @seatId as int,
    @accountId as int,
    @bookTime as datetimeoffset(7),
    @bookType as int
as
    update FlightSeatsInfo
    set BookTime = @bookTime,
        BookType = @bookType
    where FlightId = @flightId
        and SeatId = @seatId
        and AccountId = @accountId

    if @@ROWCOUNT = 0
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