-- Create a new table called 'GameReport' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.GameReport', 'U') IS NOT NULL
DROP TABLE dbo.GameReport
GO
-- Create the table in the specified schema
CREATE TABLE dbo.GameReport
(
    report_id INT NOT NULL PRIMARY KEY ,
    game_id INT NOT NULL,
    minute INT NOT NULL,
    player1_name VARCHAR NOT NULL,
    player1_id INT NOT NULL,
    player2_name VARCHAR ,
    player2_id INT,
    report_type VARCHAR NOT NULL,
);
GO