create procedure GetAirplaneSeatTypeById
    @id as int
as
    select *
    from SeatTypes
    where Id = @id
