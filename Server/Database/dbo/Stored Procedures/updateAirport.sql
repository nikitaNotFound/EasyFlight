CREATE PROCEDURE [dbo].[updateAirport]
	@id AS INT,
	@name AS NVARCHAR(50),
	@cityId AS INT
as
	update airports
	set name=@name, cityId=@cityId
	where id=@id

	select SCOPE_IDENTITY();