create procedure UpdateAccountName
    @firstName as nvarchar(50),
    @secondName as nvarchar(50),
    @accountId as int
as
    update Accounts
    set FirstName = @firstName,
        SecondName = @secondName
    where Id = @accountId

    update AccountUpdates
    set LastNameUpdateTime = sysdatetimeoffset()
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
            ''
        )
    end