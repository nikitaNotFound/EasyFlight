create procedure CheckCountryDublicate
    @name as nvarchar(60)
as
    select top 1 1
    from Countries
    where Name = @name