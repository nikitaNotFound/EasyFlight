create procedure [dbo].[SearchCityAirportsByName]
    @cityId as int,
    @nameFilter as nvarchar(50)
as
	select *
	from airports
	where cityId = @cityId
		and name LIKE @nameFilter + '%'