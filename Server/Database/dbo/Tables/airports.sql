CREATE TABLE [dbo].[airports] (
    [id]     INT           IDENTITY (1, 1) NOT NULL,
    [name]   NVARCHAR (50) NOT NULL,
    [cityId] INT           NOT NULL,
    CONSTRAINT [PK_airports] PRIMARY KEY CLUSTERED ([id] ASC)
);

