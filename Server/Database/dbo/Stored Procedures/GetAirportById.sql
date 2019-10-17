create procedure [dbo].[GetAirportById]
    @id as int
as
    select top 1 *
    from Airports
    where Id = @id