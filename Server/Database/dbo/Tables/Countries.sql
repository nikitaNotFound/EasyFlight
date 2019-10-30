create table [dbo].[Countries] (
    [Id]   int           identity (1, 1) not null,
    [Name] nvarchar (50) not null,
    constraint [PK_Countries] primary key clustered ([Id] asc)
);