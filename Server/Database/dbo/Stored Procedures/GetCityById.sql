create procedure [dbo].[GetCityById]
    @id as int
as
    select *
    from Cities
    where Id = @id
