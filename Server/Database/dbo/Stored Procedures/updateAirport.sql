create procedure [dbo].[UpdateAirport]
    @id as int,
    @name as nvarchar(50),
    @cityId as int
as
	update airports
	set name=@name, cityId=@cityId
	where id=@id

	select SCOPE_IDENTITY();