CREATE PROCEDURE UpdateCountry
@name AS NVARCHAR(50),
@id AS INT
AS
	UPDATE countries
	SET name=@name
	WHERE id=@id
