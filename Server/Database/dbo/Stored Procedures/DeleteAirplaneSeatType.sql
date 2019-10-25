create procedure DeleteAirplaneSeatType
	@airplaneId as int,
	@seatTypeId as int
as
	delete SeatTypes
	where Id = @seatTypeId
		and AirplaneId = @airplaneId