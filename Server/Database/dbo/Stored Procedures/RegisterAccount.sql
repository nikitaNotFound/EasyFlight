create procedure [dbo].[RegisterAccount]
    @firstName as nvarchar(50),
    @secondName as nvarchar(50),
    @email as nvarchar(50),
    @hashedPassword as varbinary(255),
    @role as int,
    @salt as binary(20)
AS
    insert INTO Accounts (FirstName, SecondName, Email, HashedPassword, Salt, Role)
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