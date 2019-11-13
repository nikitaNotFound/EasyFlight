create procedure [dbo].[GetAccountFlightsInfo]
    @accountId as int,
    @finalBookType as int
as
    select *
    from FlightBooksInfo
    where AccountId = @accountId
        and BookType = @finalBookType