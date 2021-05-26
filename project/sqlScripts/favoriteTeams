-- Create a new table called 'FavoriteTeams' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.FavoriteTeams', 'U') IS NOT NULL
DROP TABLE dbo.FavoriteTeams
GO
-- Create the table in the specified schema
CREATE TABLE dbo.FavoriteTeams
(
    user_id INT NOT NULL ,
    -- primary key column
    team_id INT NOT NULL,
    primary key (user_id, team_id),
    -- specify more columns here
);
GO