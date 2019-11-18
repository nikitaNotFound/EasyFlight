create procedure UpdateAccountAvatar
    @accountId as int,
    @avatarUpdatingIntervalInSeconds as int
as
    merge AccountUpdates as target
    using
        (select @accountId, sysdatetimeoffset(), sysdatetimeoffset() - @avatarUpdatingIntervalInSeconds)
            as source
            (AccountId, LastAvatarUpdateTime, LastNameUpdateTime)
    on (target.AccountId = source.AccountId)
    when matched then
        update set
                   target.LastAvatarUpdateTime = source.LastAvatarUpdateTime,
                   target.LastNameUpdateTime = source.LastNameUpdateTime
    when not matched then
        insert
        (
            AccountId,
            LastNameUpdateTime,
            LastAvatarUpdateTIme
        )
        values
        (
            source.AccountId,
            source.LastNameUpdateTime,
            source.LastAvatarUpdateTime
        );