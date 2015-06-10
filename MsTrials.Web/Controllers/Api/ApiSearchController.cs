using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace MsTrials.Web.Controllers.Api
{
    public class ApiSearchController : ApiController
    {
        public IEnumerable<SelectListItem> GetMedicamentos()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                List<SelectListItem> model = (from c in context.Medicamentoes
                                                    select new SelectListItem
                                                    {
                                                        Value = c.MedicamentoId.ToString(),
                                                        Text = c.Descripcion
                                                    }).OrderBy(a => a.Text).ToList();

                //model.Insert(0, (new SelectListItem { Text = Resources.Resources.Select, Value = "0" }));
                return model;
            }
        }

        public List<SelectListItem> GetComparadores()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                List<SelectListItem> model = (from c in context.Comparadors
                                                     select new SelectListItem
                                                     {
                                                         Value = c.ComparadorId.ToString(),
                                                         Text = c.Descripcion
                                                     }).OrderBy(a => a.Text).ToList();

                //model.Insert(0, (new SelectListItem { Text = Resources.Resources.Select, Value = "0" }));
                return model;
            }
        }

        public List<SelectListItem> GetIndicaciones()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                List<SelectListItem> model = (from c in context.Indicacions
                                              select new SelectListItem
                                              {
                                                  Value = c.IndicacionId.ToString(),
                                                  Text = c.Descripcion
                                              }).OrderBy(a => a.Text).ToList();

                //model.Insert(0, (new SelectListItem { Text = Resources.Resources.Select, Value = "0" }));
                return model;
            }
        }

        public List<SelectListItem> GetSponsors()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                List<SelectListItem> model = (from c in context.Sponsors
                                              select new SelectListItem
                                              {
                                                  Value = c.SponsorId.ToString(),
                                                  Text = c.Nombre
                                              }).OrderBy(a => a.Text).ToList();

                //model.Insert(0, (new SelectListItem { Text = Resources.Resources.Select, Value = "0" }));
                return model;
            }
        }

        public List<SelectListItem> GetAutores()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                List<SelectListItem> model = (from c in context.Autors
                                              select new SelectListItem
                                              {
                                                  Value = c.AutorId.ToString(),
                                                  Text = c.Apellido
                                              }).OrderBy(a => a.Text).ToList();

                //model.Insert(0, (new SelectListItem { Text = Resources.Resources.Select, Value = "0" }));
                return model;
            }
        }

        public SearchAutorResult[] GetArrayOfAutoresNames(string input)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var query = (from c in context.Autors
                             where input == null || input == "" || c.Apellido.Contains(input) || c.Nombre.Contains(input)
                             select new SearchAutorResult 
                             { value = c.Apellido + ", " + c.Nombre, 
                               data = c.AutorId.ToString() })
                             .AsEnumerable()
                             .OrderBy(x => x.value)
                             .ToArray();

                return query;
            }
        }
    }
}