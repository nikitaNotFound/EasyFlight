create procedure UpdateCountry
    @name as nvarchar(50),
    @id as int
as
    update Countries
    set Name = @name
    where Id = @id
    select SCOPE_IDENTITY();