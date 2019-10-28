CREATE TABLE [dbo].[Cities] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (50) NOT NULL,
    [CountryId] INT           NOT NULL,
    CONSTRAINT [PK_cities] PRIMARY KEY CLUSTERED ([Id] ASC)
);

