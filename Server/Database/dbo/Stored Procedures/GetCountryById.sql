CREATE procedure [dbo].[GetCountryById]
	@id as int
as
	select top 1 *
	from Countries
	where Id = @id