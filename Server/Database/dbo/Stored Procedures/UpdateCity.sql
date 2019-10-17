create procedure UpdateCity
    @id as int,
    @name as nvarchar(70),
    @countryId as int
as
    update Cities
    set name = @name, countryId = @countryId
    where id = @id
    select SCOPE_IDENTITY();