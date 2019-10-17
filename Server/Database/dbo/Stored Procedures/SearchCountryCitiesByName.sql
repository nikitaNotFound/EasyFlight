create procedure [dbo].[SearchCountryCitiesByName]
    @nameFilter as nvarchar(70),
    @countryId as int
as
    select *
    from Cities
    where Name like @nameFilter + '%'
        and CountryId = @countryId