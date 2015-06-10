using MsTrials.Web.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Abp.Extensions;

namespace MsTrials.Web.Controllers.Api
{
    public class ApiEstudioController : ApiController
    {
        //[JsonpFilter]
        public EstudioPagination GetByFilter(string searchParams)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var parameters = js.Deserialize<SearchEstudioFilter>(searchParams);

            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                EstudioPagination result = new EstudioPagination();
                var model = (from e in context.Estudios
                             from a in context.Autors
                               .Where(a => a.AutorId == e.PrimerAutorId)
                               .DefaultIfEmpty()
                             where e.Active == 1 
                               && ((e.MedicamentoId == parameters.medicamentoId || parameters.medicamentoId == 0 || !parameters.medicamentoId.HasValue)
                               && (e.IndicacionId == parameters.indicacionId || parameters.indicacionId == 0 || !parameters.indicacionId.HasValue)
                               && (e.ComparadorId == parameters.comparadorId || parameters.comparadorId == 0 || !parameters.comparadorId.HasValue)
                               && (e.SponsorId == parameters.sponsorId || parameters.sponsorId == 0 || !parameters.sponsorId.HasValue)
                               && (e.PrimerAutorId == parameters.primerAutorId || parameters.primerAutorId == 0 || !parameters.primerAutorId.HasValue)
                               /*&& (e.EstudioId > parameters.lastEstudioId || parameters.lastEstudioId == 0 || !parameters.lastEstudioId.HasValue)*/)
                             select new EstudioApiModel
                             {
                                 id = e.EstudioId,
                                 titulo = e.Titulo,
                                 nombre = e.Nombre,
                                 imageUrl = e.ImageURL, 
                                 anio = e.Año,
                                 revision = e.Revision,
                                 volumen = e.Volumen,
                                 cantidadDeVisitas = e.CantidadVisitas.HasValue ? e.CantidadVisitas.Value : 0,
                                 primerAutor = a.Apellido,
                                 metodo = e.Metodo,
                                 nombreComercial = e.NombreComercial,
                                 resultados = e.Resultados,
                                 objetivos = e.Objetivos,
                                 conclusion = e.Conclusion,
                                 medicamento = e.Medicamento != null ? e.Medicamento.Descripcion : "",
                                 comparador = e.Comparador != null ? e.Comparador.Descripcion : "",
                                 indicacion = e.Indicacion != null ? e.Indicacion.Descripcion : "",
                                 sponsor = e.Sponsor != null ? e.Sponsor.Nombre : "",
                                 link = e.Link,
                                 medicamentoId = e.MedicamentoId,
                                 comparadorId = e.ComparadorId,
                                 indicacionId = e.IndicacionId,
                                 sponsorId = e.SponsorId,
                                 primerAutorId = e.PrimerAutorId
                             });

                /*if (parameters.lastEstudioId > 0)
                {
                    //este ordamiento lo hacemos para limitar la cantidad y que los n sean los mas proximos al ultimo recibido.
                    result.estudios = model.OrderBy(s => s.id)
                                           .Take(parameters.maxRecords);

                    //pero en realidad los queremos ordenados descendientemente.
                    result.estudios = result.estudios.OrderByDescending(s => s.id).ToList();
                }
                else
                {
                    result.estudios = model.OrderByDescending(s => s.id)
                                           .Skip(parameters.maxRecords * (parameters.pageNumber - 1))
                                           .Take(parameters.maxRecords)
                                           .ToList();
                }*/
                if (parameters.maxRecords == 0)
                {
                    result.estudios = model.OrderByDescending(s => s.id)
                                           .ToList();
                }
                else
                {
                    result.estudios = model.OrderByDescending(s => s.id)
                                           .Skip(parameters.maxRecords * (parameters.pageNumber - 1))
                                           .Take(parameters.maxRecords)
                                           .ToList();
                }

                result.totalRecords = model.Count();

                return result;
            }
        }

        public IEnumerable<EstudioApiModel> GetAll()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                IEnumerable<EstudioApiModel> model = (from e in context.Estudios
                                                      select new EstudioApiModel
                                                      {
                                                          id = e.EstudioId,
                                                          titulo = e.Titulo,
                                                          anio = e.Año,
                                                          revision = e.Revision,
                                                          volumen = e.Volumen
                                                      }).ToList();

                return model;
            }
        }

        public EstudioApiModel GetById(string searchParams)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var result = js.Deserialize<SearchEstudioFilter>(searchParams);

            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                EstudioApiModel model = (from e in context.Estudios
                                         from a in context.Autors
                                                .Where(a => a.AutorId == e.PrimerAutorId)
                                                .DefaultIfEmpty()
                                            where e.EstudioId == result.estudioId
                                            select new EstudioApiModel
                                            {
                                                titulo = e.Titulo,
                                                nombre = e.Nombre,
                                                imageUrl = e.ImageURL,
                                                anio = e.Año,
                                                revision = e.Revision,
                                                volumen = e.Volumen,
                                                metodo = e.Metodo,
                                                nombreComercial = e.NombreComercial,
                                                resultados = e.Resultados,
                                                objetivos = e.Objetivos,
                                                conclusion = e.Conclusion,
                                                primerAutor = a.Apellido,
                                                medicamento = e.Medicamento != null ? e.Medicamento.Descripcion : "",
                                                comparador = e.Comparador != null ? e.Comparador.Descripcion : "",
                                                indicacion = e.Indicacion != null ? e.Indicacion.Descripcion : "",
                                                sponsor = e.Sponsor != null ? e.Sponsor.Nombre : "",
                                                link = e.Link
                                            }).FirstOrDefault();

                model.autores = (from ae in context.AutorEstudios
                                    join a in context.Autors on ae.AutorId equals a.AutorId
                                    where ae.EstudioId == result.estudioId
                                     select a.Apellido).ToArray();

                return model;
            }
        }

        public IEnumerable GetUltimosEstudios()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                IEnumerable model = (from e in context.Estudios

                    from a in context.Autors
                        .Where(a => a.AutorId == e.PrimerAutorId)
                        .DefaultIfEmpty()
                    select new 
                    {
                        fecha = e.FechaCreacion,
                        titulo = e.Titulo,
                        nombre = e.Nombre,
                    })
                    .OrderByDescending(x=>x.fecha)
                    .Take(5)
                    .ToList();

                return model;
            }
        }

        public IEnumerable<EstudioApiModel> GetRecommendedByFilter(string searchParams)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var parameters = js.Deserialize<SearchEstudioFilter>(searchParams);

            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                IEnumerable<EstudioApiModel> model = (from e in context.Estudios
                                                      from a in context.Autors
                                                        .Where(a => a.AutorId == e.PrimerAutorId)
                                                        .DefaultIfEmpty()
                                                      where e.Active == 1
                                                        &&((e.MedicamentoId == parameters.medicamentoId || parameters.medicamentoId == 0 || !parameters.medicamentoId.HasValue)
                                                        && (e.IndicacionId == parameters.indicacionId || parameters.indicacionId == 0 || !parameters.indicacionId.HasValue)
                                                        && (e.ComparadorId == parameters.comparadorId || parameters.comparadorId == 0 || !parameters.comparadorId.HasValue)
                                                        && (e.SponsorId == parameters.sponsorId || parameters.sponsorId == 0 || !parameters.sponsorId.HasValue)
                                                        && (e.PrimerAutorId == parameters.primerAutorId || parameters.primerAutorId == 0 || !parameters.primerAutorId.HasValue))
                                                      select new EstudioApiModel
                                                      {
                                                          id = e.EstudioId,
                                                          titulo = e.Titulo,
                                                          nombre = e.Nombre,
                                                          imageUrl = e.ImageURL,
                                                          anio = e.Año,
                                                          revision = e.Revision,
                                                          volumen = e.Volumen,
                                                          cantidadDeVisitas = e.CantidadVisitas.HasValue ? e.CantidadVisitas.Value : 0,
                                                          primerAutor = a.Apellido
                                                      })
                                                      .OrderByDescending(s => s.cantidadDeVisitas)
                                                      .Take(parameters.maxRecords)
                                                      .ToList();

                return model;
            }
        }

        //por ahora GetRankingByFilter y GetRecommendedByFilter son iguales. Para mí no es así que ambos ordenan por cantidadDeVisitas ... pero de ser así efectivamente habrá que borrar uno de los dos.
        public EstudioPagination GetRankingByFilter(string searchParams)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var parameters = js.Deserialize<SearchEstudioFilter>(searchParams);

            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                EstudioPagination result = new EstudioPagination();
                var model = (from e in context.Estudios
                             from a in context.Autors
                               .Where(a => a.AutorId == e.PrimerAutorId)
                               .DefaultIfEmpty()
                             where e.Active == 1 
                               && ((e.MedicamentoId == parameters.medicamentoId || parameters.medicamentoId == 0 || !parameters.medicamentoId.HasValue)
                               && (e.IndicacionId == parameters.indicacionId || parameters.indicacionId == 0 || !parameters.indicacionId.HasValue)
                               && (e.ComparadorId == parameters.comparadorId || parameters.comparadorId == 0 || !parameters.comparadorId.HasValue)
                               && (e.SponsorId == parameters.sponsorId || parameters.sponsorId == 0 || !parameters.sponsorId.HasValue)
                               && (e.PrimerAutorId == parameters.primerAutorId || parameters.primerAutorId == 0 || !parameters.primerAutorId.HasValue))
                             select new EstudioApiModel
                             {
                                 id = e.EstudioId,
                                 titulo = e.Titulo,
                                 nombre = e.Nombre,
                                 imageUrl = e.ImageURL,
                                 anio = e.Año,
                                 revision = e.Revision,
                                 volumen = e.Volumen,
                                 cantidadDeVisitas = e.CantidadVisitas.HasValue ? e.CantidadVisitas.Value : 0,
                                 primerAutor = a.Apellido,
                                 metodo = e.Metodo,
                                 nombreComercial = e.NombreComercial,
                                 resultados = e.Resultados,
                                 objetivos = e.Objetivos,
                                 conclusion = e.Conclusion,
                                 medicamento = e.Medicamento != null ? e.Medicamento.Descripcion : "",
                                 comparador = e.Comparador != null ? e.Comparador.Descripcion : "",
                                 indicacion = e.Indicacion != null ? e.Indicacion.Descripcion : "",
                                 sponsor = e.Sponsor != null ? e.Sponsor.Nombre : "",
                                 link = e.Link,
                                 medicamentoId = e.MedicamentoId,
                                 comparadorId = e.ComparadorId,
                                 indicacionId = e.IndicacionId,
                                 sponsorId = e.SponsorId,
                                 primerAutorId = e.PrimerAutorId
                             });

                if (parameters.maxRecords == 0)
                {
                    result.estudios = model.OrderByDescending(s => s.cantidadDeVisitas)
                                                          .ToList();
                }
                else
                {
                    result.estudios = model.OrderByDescending(s => s.cantidadDeVisitas)
                                                          .Skip(parameters.maxRecords * (parameters.pageNumber - 1))
                                                          .Take(parameters.maxRecords)
                                                          .ToList();
                }
                result.totalRecords = model.Count();

                return result;
            }
        }

        public string GetIncrementEstudioViews(string searchParams)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var parameters = js.Deserialize<SearchEstudioShortFilter>(searchParams);

            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var estudio = (from e in context.Estudios
                               where e.EstudioId == parameters.estudioId
                               select e).FirstOrDefault();
                estudio.CantidadVisitas = estudio.CantidadVisitas.HasValue ? estudio.CantidadVisitas.Value + 1 : 1;

                context.SaveChanges();

                return "0";
            }
        }
    }
}