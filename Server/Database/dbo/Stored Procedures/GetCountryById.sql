create procedure [dbo].[GetCountryById]
    @id as int
as
    select top *
    from Countries
    where Id = @id