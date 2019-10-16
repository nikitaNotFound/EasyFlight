CREATE PROCEDURE [dbo].[searchCityAirportsByName]
	@cityId as INT,
	@nameFilter as NVARCHAR(50)
as
	select *
	from airports
	where cityId = @cityId
		and name LIKE @nameFilter + '%'