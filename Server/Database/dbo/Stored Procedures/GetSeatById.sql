create procedure GetSeatById
    @id as int
as
    select *
    from Seats
    where Id = @id
go