create procedure AddCity
    @name as nvarchar(70),
    @countryId as int
as
    insert into Cities (name, countryId)
    values (@name, @countryId)
    select SCOPE_IDENTITY();