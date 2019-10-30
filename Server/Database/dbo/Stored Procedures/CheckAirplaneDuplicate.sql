create procedure CheckAirplaneDuplicate
    @name as nvarchar(50)
as
    select top 1 1
    from Airplanes
    where Name = @name