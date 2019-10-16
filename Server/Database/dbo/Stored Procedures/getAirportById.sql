CREATE PROCEDURE [dbo].[getAirportById]
	@id as int
as
	select top 1 *
	from airports
	where id = @id