create procedure getCountryCities
	@id as int
as
	select *
	from cities
	where countryId = @id;