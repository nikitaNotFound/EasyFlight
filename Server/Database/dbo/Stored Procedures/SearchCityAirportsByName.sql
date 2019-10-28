create procedure [dbo].[SearchCityAirportsByName]
	@cityId as int,
	@nameFilter as nvarchar(50)
as
	select *
	from Airports
	where CityId = @cityId
		and Name like @nameFilter + '%'