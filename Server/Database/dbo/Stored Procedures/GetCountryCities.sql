create procedure GetCountryCities
    @countryId as int
as
    select *
    from Cities
    where countryId = @countryId;