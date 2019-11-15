create procedure UpdateAccountAvatar
    @accountId as int,
    @avatarUpdatingIntervalInSeconds as int
as
    update AccountUpdates
        set AccountUpdates.LastAvatarUpdateTime = sysdatetimeoffset()
        where AccountId = @accountId

    if @@rowcount = 0
    begin
        insert into AccountUpdates
        (
            AccountId,
            LastNameUpdateTime,
            LastAvatarUpdateTIme
        )
        values
        (
            @accountId,
            sysdatetimeoffset(),
            dateadd(second, -@avatarUpdatingIntervalInSeconds, sysdatetimeoffset())
        )
    end