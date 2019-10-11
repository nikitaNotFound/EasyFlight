CREATE PROCEDURE UpdateCity
@id AS INT,
@name AS NVARCHAR(50),
@countryId AS INT
AS
	UPDATE cities
	SET name=@name, countryId=@countryId
	WHERE id=@id
	SELECT SCOPE_IDENTITY();