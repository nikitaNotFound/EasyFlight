create table [dbo].[Accounts] (
    [Id]           int             identity (1, 1) not null,
    [FirstName]    nvarchar (50)   not null,
    [SecondName]   nvarchar (50)   not null,
    [Email]        nvarchar (50)   not null,
    [PasswordHash] varbinary (255) not null,
    [Salt]         binaty (20)     not null,
    [Role]         int             not null,
    constraint [PK_Accounts] primary key clustered ([Id] asc)
);

