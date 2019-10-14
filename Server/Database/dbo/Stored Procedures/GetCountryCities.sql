create procedure getCountryCities
	@countryId as int
as
	select *
	from cities
	where countryId = @countryId;