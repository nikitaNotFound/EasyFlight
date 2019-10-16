create procedure [dbo].[AddAirport]
    @name as nvarchar(50),
    @cityId as int
as
	insert into airports (name, cityId)
	values (@name, @cityId)

	select SCOPE_IDENTITY();