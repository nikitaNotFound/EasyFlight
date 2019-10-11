CREATE PROCEDURE GetCountryById
@id AS INT
AS
	SELECT TOP 1 *
	FROM countries
	WHERE id=@id
