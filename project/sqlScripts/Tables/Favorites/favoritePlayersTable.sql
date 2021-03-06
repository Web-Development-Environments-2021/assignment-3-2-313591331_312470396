-- Create a new table called 'FavoritePlayers' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.FavoritePlayers', 'U') IS NOT NULL
DROP TABLE dbo.FavoritePlayers
GO
-- Create the table in the specified schema
CREATE TABLE dbo.FavoritePlayers
(
    user_id INT NOT NULL ,
    -- primary key column
    player_id INT NOT NULL,
    primary key (user_id, player_id),
    -- specify more columns here
);
GO