create procedure UpdateCountry
    @name as nvarchar(50),
    @id as int
as
    update Countries
    set name = @name
    where id = @id
    select SCOPE_IDENTITY();