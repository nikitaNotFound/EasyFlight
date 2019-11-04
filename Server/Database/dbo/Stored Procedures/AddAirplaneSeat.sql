create procedure AddAirplaneSeat
    @airplaneId as int,
    @floor as int,
    @section as int,
    @zone as int,
    @row as int,
    @number as int,
    @typeId as int
as
    insert into Seats (AirplaneId, Floor, Section, Zone, Row, Number, TypeId)
    values
    (
        @airplaneId,
        @floor,
        @section,
        @zone,
        @row,
        @number,
        @typeId
    )
    
    select SCOPE_IDENTITY()
