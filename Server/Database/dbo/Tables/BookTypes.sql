create table [dbo].[BookTypes] (
    [Id]   int           identity (1, 1) not null,
    [Name] nvarchar (50) not null,
    constraint [PK_BookTypes] primary key clustered ([Id] asc)
);

