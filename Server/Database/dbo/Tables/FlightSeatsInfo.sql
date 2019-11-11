create table [dbo].[FlightSeatsInfo](
    [FlightId] [int] NOT NULL,
    [AccountId] [int] NOT NULL,
    [SeatId] [int] NOT NULL,
    [BookTime] [datetimeoffset](7) NOT NULL,
    [BookType] [int] NOT NULL
)
