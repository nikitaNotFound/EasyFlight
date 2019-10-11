CREATE PROCEDURE CheckCountryDublicate
@name AS NVARCHAR(50)
AS
	SELECT TOP 1 *
	FROM countries
	WHERE name=@name
