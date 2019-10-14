create procedure searchCitiesByName
	@nameFilter as nvarchar(70)
as
	select *
	from cities
	where name like @nameFilter + '%';