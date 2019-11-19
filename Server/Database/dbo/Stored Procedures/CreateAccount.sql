create procedure [dbo].[CreateAccount]
    @firstName as nvarchar(50),
    @secondName as nvarchar(50),
    @email as nvarchar(50),
    @passwordHash as varbinary(255) = null,
    @role as int,
    @salt as binary(20) = null
as
    insert into Accounts (FirstName, SecondName, Email, PasswordHash, Salt, Role)
    values
    (
        @firstName,
        @secondName,
        @email,
        @passwordHash,
        @salt,
        @role
    );

    select *
    from Accounts
    where Id = SCOPE_IDENTITY();
go

