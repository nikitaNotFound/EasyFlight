create procedure DeleteAirplaneSeats
	@airplaneId as int
as
	delete Seats
	where AirplaneId = @airplaneId