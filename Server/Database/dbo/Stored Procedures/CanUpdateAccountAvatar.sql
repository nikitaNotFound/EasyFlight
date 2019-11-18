CREATE procedure CanUpdateAccountAvatar
    @accountId as int,
    @accountAvatarUpdatingIntervalInSeconds as int
as
    select top 1 1
    from AccountUpdates au
    where AccountId = @accountId
        and datediff(second, au.LastAvatarUpdateTime, sysdatetimeoffset()) < @accountAvatarUpdatingIntervalInSeconds