create procedure UpdateCity
    @id as int,
    @name as nvarchar(70),
    @countryId as int
as
    update Cities
    set Name = @name, CountryId = @countryId
    where Id = @id
    select SCOPE_IDENTITY();