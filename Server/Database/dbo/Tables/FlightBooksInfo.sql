create table [dbo].[FlightBooksInfo] (
    [Id]                      int                identity (1, 1) not null,
    [FlightId]                int                not null,
    [SuitcaseOverloadCost]    int                not null,
    [HandLuggageOverloadCost] int                not null,
    [BookType]                int                not null,
    [BookTime]                datetimeoffset (7) not null,
    [AccountId]               int                not null,
    constraint [PK_FlightBooksInfo] primary key clustered ([Id] asc)
);

