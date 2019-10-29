create procedure [dbo].[GetCountryById]
    @id as int
as
    select *
    from Countries
    where Id = @id