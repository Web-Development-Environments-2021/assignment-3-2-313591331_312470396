-- Create a new table called 'FavoriteGames' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.FavoriteGames', 'U') IS NOT NULL
DROP TABLE dbo.FavoriteGames
GO
-- Create the table in the specified schema
CREATE TABLE dbo.FavoriteGames
(
    user_id INT NOT NULL ,
    -- primary key column
    game_id INT NOT NULL,
    primary key (user_id, game_id),
    -- specify more columns here
);
GO