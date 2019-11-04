create procedure [dbo].[AddCity]
    @name as nvarchar(70),
    @countryId as int
as
    insert into Cities (Name, CountryId)
    values (@name, @countryId)
    
    select SCOPE_IDENTITY()
