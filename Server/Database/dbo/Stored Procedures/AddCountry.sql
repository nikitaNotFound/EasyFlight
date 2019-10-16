create procedure addCountry
    @name as nvarchar(60)
as
    insert into countries (name)
    values (@name)
    select SCOPE_IDENTITY();