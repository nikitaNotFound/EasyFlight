CREATE procedure [dbo].[AddAirplaneSeatType]
	@airplaneId as int,
	@name as nvarchar(50),
	@color as nvarchar(50)
as
	insert into SeatTypes (AirplaneId, Name, Color)
	values (@airplaneId, @name, @color)