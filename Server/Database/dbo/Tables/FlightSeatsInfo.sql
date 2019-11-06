create table [dbo].[FlightSeatsInfo] (
    [FlightId]   int                not null,
    [AccountId]  int                not null,
    [SeatId]     int                not null,
    [AirplaneId] int                not null,
    [BookTime]   datetimeoffset (7) not null
);
