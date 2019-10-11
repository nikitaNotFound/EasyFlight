CREATE PROCEDURE AddCity
@name AS NVARCHAR(50),
@countryId AS INT
AS
	INSERT INTO cities (name, countryId)
	VALUES (@name, @countryId)
	SELECT SCOPE_IDENTITY();