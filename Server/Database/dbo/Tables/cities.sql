CREATE TABLE [dbo].[Cities] (
    [id]        INT           IDENTITY (1, 1) NOT NULL,
    [name]      NVARCHAR (50) NOT NULL,
    [countryId] INT           NOT NULL,
    CONSTRAINT [PK_Cities] PRIMARY KEY CLUSTERED ([id] ASC)
);