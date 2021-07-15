IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
DROP TABLE dbo.Games
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Games
(
    gameID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    leagueID INT NOT NULL,
    seasonID INT NOT NULL,
    stageID INT NOT NULL,
    refereeID INT,
    stadiumID INT NOT NULL,
    homeTeamID INT NOT NULL,
    awayTeamID INT NOT NULL,
    gameDate DATETIME NOT NULL,
    homeScore INT ,
    awayScore INT ,
);
GO