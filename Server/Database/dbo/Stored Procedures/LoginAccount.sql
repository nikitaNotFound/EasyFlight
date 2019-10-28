create procedure [dbo].[LoginAccount] 
    @email as nvarchar(50),
    @hashedPassword as varbinary(255)
as
    select *
    from Accounts
    where Email = @email
        and HashedPassword = @hashedPassword;