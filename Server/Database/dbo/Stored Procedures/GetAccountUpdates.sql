create procedure GetAccountUpdates
    @accountId as int
as
    select *
    from AccountUpdates
    where AccountId = @accountId