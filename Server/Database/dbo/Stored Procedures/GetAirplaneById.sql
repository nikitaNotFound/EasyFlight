create procedure GetAirplaneById
    @id as int
as
    select top 1 *
    from Airplanes
    where Id = @id