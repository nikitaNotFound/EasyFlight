CREATE TABLE [dbo].[SeatTypes] (
    [Id]         INT           IDENTITY (1, 1) NOT NULL,
    [AirplaneId] INT           NOT NULL,
    [Name]       NVARCHAR (75) NOT NULL,
    [Color]      NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_SeatTypes] PRIMARY KEY CLUSTERED ([Id] ASC)
);

