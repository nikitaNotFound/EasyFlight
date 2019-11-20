create procedure UpdateAccountName
    @firstName as nvarchar(50),
    @secondName as nvarchar(50),
    @accountId as int,
    @avatarUpdatingIntervalInSeconds as int
as
    merge AccountUpdates as target
    using
        (
            select
                @accountId,
                sysdatetimeoffset(),
                sysdatetimeoffset() - @avatarUpdatingIntervalInSeconds
        )
    as source
        (AccountId, LastNameUpdateTime, LastAvatarUpdateTime)
    on (target.AccountId = source.AccountId)
    when matched then
        update set
            target.LastNameUpdateTime = source.LastNameUpdateTime,
            target.LastAvatarUpdateTime = source.LastAvatarUpdateTime
    when not matched
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
        )

    update Accounts
    set
        FirstName = @firstName,
        SecondName = @secondName
    where Id = @accountId