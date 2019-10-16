CREATE PROCEDURE [dbo].[searchAirportsByName]
	@name as nvarchar(50)
as
	select *
	from airports
	where name LIKE @name + '%';