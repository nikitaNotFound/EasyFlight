CREATE TABLE [dbo].[cities] (
    [id]        INT           IDENTITY (1, 1) NOT NULL,
    [name]      NVARCHAR (50) NOT NULL,
    [countryId] INT           NOT NULL,
    CONSTRAINT [PK_cities] PRIMARY KEY CLUSTERED ([id] ASC)
);