create procedure UpdateAirplane
    @id as int,
    @name as nvarchar(50),
    @carryingKg as int
as
    update Airplanes
    set Name = @name, CarryingKg = @carryingKg
    where Id = @id