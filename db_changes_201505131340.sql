Use MsTrials

drop table dbo.SponsorEstudio

GO

alter table dbo.Estudio add SponsorId int NULL

GO

ALTER TABLE [dbo].[Estudio]  WITH CHECK ADD  CONSTRAINT [FK_Estudios_Sponsors] FOREIGN KEY([SponsorId])
REFERENCES [dbo].[Sponsor] ([SponsorId])
GO

ALTER TABLE [dbo].[Estudio] CHECK CONSTRAINT [FK_Estudios_Sponsors]
GO