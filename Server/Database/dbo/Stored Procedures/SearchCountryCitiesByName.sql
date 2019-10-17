create procedure SearchCountryCitiesByName
    @nameFilter as nvarchar(70),
    @countryId as int
as
    select *
    from Cities
    where name like @nameFilter + '%'
        and countryId = @countryId