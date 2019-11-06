create table [dbo].[Airplanes] (
    [Id]         int           identity (1, 1) not null,
    [Name]       nvarchar (50) not null,
    [CarryingKg] int           not null,
    constraint [PK_Airplanes] primary key clustered ([Id] asc)
);