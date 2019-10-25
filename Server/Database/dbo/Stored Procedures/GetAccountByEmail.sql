create procedure [dbo].[GetAccountByEmail]
    @email as nvarchar(50)
as
    select *
    from Accounts
    where Email = @email
