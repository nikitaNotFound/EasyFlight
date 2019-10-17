create procedure SearchCitiesByName
    @nameFilter as nvarchar(70)
as
    select *
    from Cities
    where name like @nameFilter + '%';