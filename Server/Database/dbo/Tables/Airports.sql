create table [dbo].[Airports] (
    [Id]     int           identity (1, 1) not null,
    [Name]   nvarchar (50) not null,
    [CityId] int           not null,
    constraint [PK_Airports] primary key clustered ([Id] asc)
);