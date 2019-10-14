create procedure searchCountriesByName
	@nameFilter as nvarchar(60)
as
	select *
	from countries
	where name LIKE @nameFilter + '%'