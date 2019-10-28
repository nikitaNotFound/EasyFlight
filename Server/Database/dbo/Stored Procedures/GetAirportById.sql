create procedure [dbo].[GetAirportById]
	@id as int
as
	select *
	from Airports
	where Id = @id