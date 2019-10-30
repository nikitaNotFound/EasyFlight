create table [dbo].[SeatTypes] (
    [Id]         int           identity (1, 1) not null,
    [AirplaneId] int           not null,
    [Name]       nvarchar (75) not null,
    [Color]      nvarchar (50) not null,
    constraint [PK_SeatTypes] primary key clustered ([Id] asc)
);