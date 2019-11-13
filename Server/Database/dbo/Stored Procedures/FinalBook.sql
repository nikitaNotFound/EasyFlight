create procedure [dbo].[FinalBook]
    @accountId as int,
    @bookId as int,
    @finalBookType as int
as
    update FlightBooksInfo
    set BookType = @finalBookType
    where AccountId = @accountId
        and Id = @bookId