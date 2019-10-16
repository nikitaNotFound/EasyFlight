CREATE PROCEDURE [dbo].[getCityAirports]
	@id as int
as
	select *
	from airports
	where cityId = @id;