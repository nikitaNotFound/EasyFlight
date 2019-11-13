create procedure [dbo].[CheckFinalBookAvailability]
    @bookId as int,
    @bookExpirationTimeInSeconds as int,
    @accountId as int
as
    select top 1 1
    from FlightBooksInfo
    where Id = @bookId
        and datediff(second, BookTime, SYSDATETIMEOFFSET()) < @bookExpirationTimeInSeconds
        and Accountid = @accountId