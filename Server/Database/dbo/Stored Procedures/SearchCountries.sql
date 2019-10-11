CREATE PROCEDURE SearchCountries
@name AS NVARCHAR(50)
AS
	SELECT *
	FROM countries
	WHERE name LIKE @name + '%'
