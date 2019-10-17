create procedure [dbo].[GetCountryCities]
    @countryId as int
as
	select *
	from Cities
	where CountryId = @countryId;