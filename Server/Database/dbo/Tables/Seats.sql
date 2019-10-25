CREATE TABLE [dbo].[Seats] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [AirplaneId] INT NOT NULL,
    [Floor]      INT NOT NULL,
    [Section]    INT NOT NULL,
    [Zone]       INT NOT NULL,
    [Row]        INT NOT NULL,
    [Number]     INT NOT NULL,
    [TypeId]     INT NOT NULL,
    CONSTRAINT [PK_Seats] PRIMARY KEY CLUSTERED ([Id] ASC)
);

