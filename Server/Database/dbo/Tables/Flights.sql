create table [dbo].[Flights] (
    [Id]                 int                identity (1, 1) not null,
    [FromAirportId]      int                not null,
    [ToAirportId]        int                not null,
    [DepartureTime]      datetimeoffset (7) not null,
    [ArrivalTime]        datetimeoffset (7) not null,
    [AirplaneId]         int                not null,
    [SuitcaseMassKg]     int                not null,
    [SuitcaseCount]      int                not null,
    [HandLuggageMassKg]  int                not null,
    [HandLuggageCount]   int                not null,
    [MassOverloadKgCost] int                not null,
    constraint [PK_Flights] primary key clustered ([Id] asc)
);
