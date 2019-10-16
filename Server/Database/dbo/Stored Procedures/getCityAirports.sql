create procedure [dbo].[GetCityAirports]
    @cityId as int
as
	select *
	from airports
	where cityId = @id;