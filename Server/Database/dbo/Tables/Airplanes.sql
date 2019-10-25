CREATE TABLE [dbo].[Airplanes] (
    [Id]         INT           IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (50) NOT NULL,
    [CarryingKg] INT           NOT NULL,
    CONSTRAINT [PK_Airplanes] PRIMARY KEY CLUSTERED ([Id] ASC)
);

