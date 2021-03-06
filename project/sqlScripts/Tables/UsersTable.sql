-- Create a new table called 'Users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    user_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    -- primary key column
    username [NVARCHAR]
(9) NOT NULL,
    firstname [NVARCHAR]
(50) NOT NULL,
    lastname [NVARCHAR]
(50) NOT NULL,
    country [NVARCHAR]
(50) NOT NULL,
    email [NVARCHAR]
(50) NOT NULL,
    img [NVARCHAR]
(100) NOT NULL,
    password [NVARCHAR]
(100) NOT NULL,
    type [NVARCHAR]
(50) NOT NULL,
    -- specify more columns here
);
GO
