Use MsTrials

GO

ALTER TABLE Estudio ADD Active INT NOT NULL DEFAULT 1

GO

UPDATE Estudio SET Active = 1

GO 

ALTER TABLE Estudio ADD ImageURL nvarchar(256) NOT NULL DEFAULT ''

GO