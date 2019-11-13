create table [dbo].[BookTypes] (
    [Id]   int           identity (1, 1) not null,
    [Name] NVARCHAR (50) not null,
    constraint [PK_BookTypes] primary key clustered ([Id] asc)
);

