create procedure CanUpdateAccountName
    @accountId as int,
    @accountNameUpdatingIntervalInSeconds as int
as
    select top 1 1
    from AccountUpdates au
    where AccountId = @accountId
        and datediff(second, au.LastNameUpdateTime, sysdatetimeoffset()) > @accountNameUpdatingIntervalInSeconds