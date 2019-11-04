create procedure [dbo].[GetCityAirports]
    @cityId as int
as
    select *
    from Airports
    where CityId = @cityId;