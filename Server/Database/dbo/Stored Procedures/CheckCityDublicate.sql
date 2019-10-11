CREATE PROCEDURE CheckCityDublicate
@name AS NVARCHAR(50),
@countryId AS INT
AS
	SELECT TOP 1 *
	FROM cities
	WHERE name=@name 
		and countryId=@countryId
