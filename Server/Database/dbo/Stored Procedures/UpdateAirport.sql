CREATE PROCEDURE [dbo].[UpdateAirport]
	@id AS INT,
	@name AS NVARCHAR(50),
	@cityId AS INT
as
	update Airports
	set Name = @name, CityId = @cityId
	where Id = @id

	select SCOPE_IDENTITY();