create procedure checkCountryDublicate
	@name as nvarchar(60)
as
	select top 1 *
	from countries
	where name = @name