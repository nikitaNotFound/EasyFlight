create procedure GetCityById
    @id as int
as
    select top 1 *
    from Cities
    where Id = @id