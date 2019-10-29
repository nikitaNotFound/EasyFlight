create procedure [dbo].[CheckCityDuplicate]
    @name as nvarchar(70),
    @countryId as int
as
    select top 1 1
    from Cities
    where Name = @name 
        and CountryId = @countryId