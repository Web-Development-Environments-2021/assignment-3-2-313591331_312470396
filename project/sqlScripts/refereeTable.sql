IF OBJECT_ID('dbo.Referees', 'U') IS NOT NULL
DROP TABLE dbo.Referees
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Referees
(
    refereeID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    user_id INT ,
    qualification [NVARCHAR] (50)

);
GO