create procedure CheckSeatTypeExistence
	@seatTypeId as int
as
	select top 1 1 
	from SeatTypes
	where Id = @seatTypeId