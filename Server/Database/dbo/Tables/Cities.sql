create table [dbo].[Cities] (
    [Id]        int           IDENTITY (1, 1) not null,
    [Name]      nvarchar (50) not null,
    [CountryId] int           not null,
    constraint [PK_Cities] primary key clustered ([Id] asc)
);