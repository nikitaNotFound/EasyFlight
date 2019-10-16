create procedure [dbo].[SearchCityAirportsByName]
    @cityId as INT,
    @nameFilter as NVARCHAR(50)
as
    select *
    from Airports
    where CityId = @cityId
        and Name like @nameFilter + '%'
