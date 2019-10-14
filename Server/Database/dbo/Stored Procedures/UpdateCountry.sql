create procedure updateCountry
	@name as nvarchar(50),
	@id as int
as
	update countries
	set name = @name
	where id = @id
	select SCOPE_IDENTITY();