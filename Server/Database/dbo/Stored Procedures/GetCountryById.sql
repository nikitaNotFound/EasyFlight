create procedure GetCountryById
    @id as int
as
    select top 1 *
    from Countries
    where Id = @id