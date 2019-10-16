create procedure getCityById
    @id as int
as
    select top 1 *
    from cities
    where id = @id