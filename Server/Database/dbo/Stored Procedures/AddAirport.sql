create procedure [dbo].[AddAirport]
	@name as nvarchar(50),
	@cityId as int
as
	insert into Airports (Name, CityId)
	values (@name, @cityId)

	select SCOPE_IDENTITY();