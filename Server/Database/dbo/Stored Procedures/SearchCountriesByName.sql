create procedure [dbo].[SearchCountriesByName]
    @nameFilter as nvarchar(60)
as
    select *
    from Countries
    where Name like @nameFilter + '%'