create procedure searchCountryCitiesByName
    @nameFilter as nvarchar(70),
    @countryId as int
as
    select *
    from cities
    where name LIKE @nameFilter + '%'
        and countryId = @countryId