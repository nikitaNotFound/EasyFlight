create procedure [dbo].[CreateAccount]
    @firstName as nvarchar(50),
    @secondName as nvarchar(50),
    @email as nvarchar(50),
    @hashedPassword as varbinary(255),
    @role as int,
    @salt as binary(20)
as
    insert into Accounts (FirstName, SecondName, Email, PasswordHash, Salt, Role)
    values
    (
        @firstName,
        @secondName,
        @email,
        @hashedPassword,
        @salt,
        @role
    );

    select *
    from Accounts
    where Id = SCOPE_IDENTITY();
