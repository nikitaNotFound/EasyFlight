CREATE PROCEDURE [dbo].[checkAirportDublicate]
	@name as nvarchar(50),
	@cityId as int
as
	select top 1 *
	from airports
	where name = @name
		and cityId = @cityId