create procedure [dbo].[CheckAirportDuplicate]
    @name as nvarchar(50),
    @cityId as int
as
    select top 1 *
    from Airports
    where Name = @name
        and CityId = @cityId
