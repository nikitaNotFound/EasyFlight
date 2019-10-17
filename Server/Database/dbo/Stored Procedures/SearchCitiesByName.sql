create procedure SearchCitiesByName
    @nameFilter as nvarchar(70)
as
    select *
    from Cities
    where Name like @nameFilter + '%';