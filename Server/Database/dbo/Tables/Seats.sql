create table [dbo].[Seats] (
    [Id]         int IDENTITY (1, 1) not null,
    [AirplaneId] int not null,
    [Floor]      int not null,
    [Section]    int not null,
    [Zone]       int not null,
    [Row]        int not null,
    [Number]     int not null,
    [TypeId]     int not null,
    constraint [PK_Seats] primary key clustered ([Id] asc)
);

