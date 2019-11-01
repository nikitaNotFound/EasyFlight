create procedure [dbo].[GetAccount] 
    @email as nvarchar(50),
    @hashedPassword as varbinary(255)
as
    select *
    from Accounts
    where Email = @email
        and PasswordHash = @hashedPassword;