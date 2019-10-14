create procedure checkCityDublicate
	@name as nvarchar(70),
	@countryId as int
as
	select top 1 *
	from cities
	where name=@name 
		and countryId = @countryId