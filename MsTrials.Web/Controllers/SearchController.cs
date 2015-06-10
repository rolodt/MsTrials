using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Data;
using System.Linq;
using System.Text;

namespace MsTrials.Web.Controllers
{
    public class SearchController : BaseController
    {

        public ActionResult Index()
        {
             using (MsTrialsEntities context = new MsTrialsEntities())
             {
                /*IEnumerable<SelectListItem> autores =  context.Autors
                                                       .Select(a => new SelectListItem
                                                                  {
                                                                      Value = a.AutorId.ToString(),
                                                                      Text = a.Nombre
                                                                  });
                 ViewBag.Autores = autores.ToList();*/

                 return PartialView("SearchEstudioPartial");
             }
        }

        [HttpPost]
        public ActionResult SearchEstudio(int? autor)
        {
            return GetResults(autor);
        }

        public ActionResult GetResults(int? autor)
        {
            try
            {
                /*if (autor == null)
                {
                    var model = new List<Estudio>();
                    model.Add(new Estudio()
                    {
                        Titulo = "C++ ",
                        Año = 2008,
                        Revision = 594,
                        Volumen = 10
                    });
                    return PartialView("SearchResultsPartial", model);
                }
                else
                {*/
                    using (MsTrialsEntities context = new MsTrialsEntities())
                    {
                        var model = from e in context.Estudios
                                    join ae in context.AutorEstudios on e.EstudioId equals ae.EstudioId
                                    join a in context.Autors on ae.AutorId equals a.AutorId
                                    where (autor == null || a.AutorId == autor)
                                    select e;

                        return PartialView("SearchResultsPartial", model.ToList());
                    }
                //}

            }
            catch (Exception)
            {
                // handle exception
                return PartialView("Error");
            }
        }
    }
}