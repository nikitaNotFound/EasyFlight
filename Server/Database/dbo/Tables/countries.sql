CREATE TABLE [dbo].[Countries] (
    [id]   INT           IDENTITY (1, 1) NOT NULL,
    [name] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Countries] PRIMARY KEY CLUSTERED ([id] ASC)
);