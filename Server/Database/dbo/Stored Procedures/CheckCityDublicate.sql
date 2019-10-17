create procedure CheckCityDublicate
    @name as nvarchar(70),
    @countryId as int
as
    select top 1 1
    from Cities
    where name = @name 
        and CountryId = @countryId