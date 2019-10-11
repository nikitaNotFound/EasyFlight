CREATE PROCEDURE SearchCitiesByName
@name as NVARCHAR(50)
AS
	SELECT * FROM cities WHERE name LIKE @name + '%';