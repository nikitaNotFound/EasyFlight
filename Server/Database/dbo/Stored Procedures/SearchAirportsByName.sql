create procedure [dbo].[SearchAirportsByName]
	@name as nvarchar(50)
as
	select *
	from Airports
	where name like @name + '%';