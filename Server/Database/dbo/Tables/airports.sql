CREATE TABLE [dbo].[Airports] (
    [Id]     INT           IDENTITY (1, 1) NOT NULL,
    [Name]   NVARCHAR (50) NOT NULL,
    [CityId] INT           NOT NULL,
    CONSTRAINT [PK_Airports] PRIMARY KEY CLUSTERED ([Id] ASC)
);