create procedure addCity
	@name as nvarchar(70),
	@countryId as int
as
	insert into cities (name, countryId)
	values (@name, @countryId)
	select SCOPE_IDENTITY();