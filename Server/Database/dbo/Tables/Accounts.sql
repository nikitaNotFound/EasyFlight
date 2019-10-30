create table [dbo].[Accounts] (
    [Id]             int             identity (1, 1) not null,
    [FirstName]      nvarchar (50)   not null,
    [SecondName]     nvarchar (50)   not null,
    [Email]          nvarchar (50)   not null,
    [HashedPassword] varbinary (255) not null,
    [Salt]           binary (20)     not null,
    [Role]           int             not null,
    constraint [PK_Accounts] primary key clustered ([Id] asc)
);
