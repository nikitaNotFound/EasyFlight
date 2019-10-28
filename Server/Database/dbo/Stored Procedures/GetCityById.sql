create procedure [dbo].[GetCityById]
    @id as int
as
    select top *
    from Cities
    where Id = @id