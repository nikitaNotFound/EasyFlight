create procedure [dbo].[GetAirportById]
    @id as int
as
    select top *
    from Airports
    where Id = @id