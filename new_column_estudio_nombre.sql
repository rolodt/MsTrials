alter table dbo.Estudio add Nombre nvarchar(256)
go
alter table dbo.Estudio add Link nvarchar(512)
go
alter table dbo.Estudio add PrimerAutorId INT NOT NULL
GO
ALTER TABLE [dbo].[Estudio]  WITH CHECK ADD  CONSTRAINT [FK_Estudio_Autores] FOREIGN KEY([PrimerAutorId])
REFERENCES [dbo].[Autor] ([AutorId])
GO

ALTER TABLE [dbo].[Estudio] CHECK CONSTRAINT [FK_Estudio_Autores]
GO