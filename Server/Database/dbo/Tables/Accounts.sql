CREATE TABLE [dbo].[Accounts] (
    [Id]             INT             IDENTITY (1, 1) NOT NULL,
    [FirstName]      NVARCHAR (50)   NOT NULL,
    [SecondName]     NVARCHAR (50)   NOT NULL,
    [Email]          NVARCHAR (50)   NOT NULL,
    [HashedPassword] VARBINARY (255) NOT NULL,
    [Salt]           BINARY (20)     NOT NULL,
    [Role]           INT             NOT NULL,
    CONSTRAINT [PK_accounts] PRIMARY KEY CLUSTERED ([Id] ASC)
);