CREATE procedure [dbo].[CheckSeatTypeDuplicate]
	@airplaneId as int,
	@name as nvarchar(50),
	@color as nvarchar(50)
as
	select top 1 1
	from SeatTypes
	where AirplaneId = @airplaneId
		and (Name = @name or Color = @color)