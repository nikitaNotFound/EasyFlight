create procedure SearchCountriesByName
    @nameFilter as nvarchar(60)
as
    select *
    from Countries
    where name like @nameFilter + '%'