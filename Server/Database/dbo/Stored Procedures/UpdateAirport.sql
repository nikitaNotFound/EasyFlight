create procedure [dbo].[UpdateAirport]
    @id as int,
    @name as nvarchar(50),
    @cityId as int
as
    update Airports
    set Name = @name, CityId = @cityId
    where Id = @id

    select SCOPE_IDENTITY();
