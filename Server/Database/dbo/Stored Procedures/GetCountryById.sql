create procedure getCountryById
    @id as int
as
    select top 1 *
    from countries
    where id = @id