create procedure [dbo].[AddAirplane]
    @name as nvarchar(50),
    @carryingKg as int
as
    insert into Airplanes (Name, CarryingKg)
    values (@name, @carryingKg)
    
    select SCOPE_IDENTITY()