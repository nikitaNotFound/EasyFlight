create procedure [dbo].[GetBookSeatsAsync]
    @bookId as int
as
    select Seats.Id as SeatId, SeatsCost.Cost
    from Seats
        cross apply (
            select Cost, SeatId
            from FlightSeatsInfo
            where FlightBookInfoId = @bookId
        ) SeatsCost
    where Id = SeatsCost.SeatId