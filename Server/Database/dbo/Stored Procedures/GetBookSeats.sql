create procedure [dbo].[GetBookSeats]
    @bookId as int
as
    select fsi.SeatId, fsi.Cost
    from FlightSeatsInfo fsi
    where fsi.FlightBookInfoId = @bookId

