CREATE PROCEDURE [dbo].[SearchCities]
@name AS NVARCHAR(50),
@countryId AS INT
AS
	SELECT *
	FROM cities
	WHERE name LIKE @name + '%'
		and countryId=@countryId
