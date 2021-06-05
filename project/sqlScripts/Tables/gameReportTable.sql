-- Create a new table called 'GameReport' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.GameReport', 'U') IS NOT NULL
DROP TABLE dbo.GameReport
GO
-- Create the table in the specified schema
CREATE TABLE dbo.GameReport
(
    report_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    report_type [NVARCHAR](50) NOT NULL,
    game_id INT NOT NULL,
    minute INT NOT NULL,
    player1_name [NVARCHAR](50) NOT NULL,
    player1_id INT NOT NULL,
    player2_name [NVARCHAR](50) ,
    player2_id INT,
);
GO