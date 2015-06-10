using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MsTrials.Web.Models;

namespace MsTrials.Web.Controllers
{
    [Authorize]
    public class AdminIndicacionController : CultureController
    {
        private string partialRoute = "~/Views/Admin/Indicacion/";
        // GET: Admin5
        public ActionResult Index()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Indicacions
                            select e;
                return View(partialRoute + "List.cshtml", model.ToList());
            }
        }

        public ActionResult Add()
        {
            return View(partialRoute + "AddEdit.cshtml");
        }

        public ActionResult Edit(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Indicacions
                            where e.IndicacionId == id
                            select e;
                return View(partialRoute + "AddEdit.cshtml", model.FirstOrDefault());
            }
        }

        [HttpPost]
        public ActionResult AddEdit(int? indicacionId, string descripcion)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                if (indicacionId == null)
                {
                    Indicacion indicacion = new Indicacion();
                    indicacion.Descripcion = descripcion;

                    context.Indicacions.Add(indicacion);
                    context.SaveChanges();
                }
                else
                {
                    var indicaciones = from Indicacion e in context.Indicacions
                                 where e.IndicacionId == indicacionId
                                 select e;

                    if (indicaciones.Count() > 0)
                    {
                        Indicacion indicacion = indicaciones.First();
                        indicacion.Descripcion = descripcion;
                        context.SaveChanges();
                    }
                }
                return RedirectToAction("Index", "admin/indicacion");
            }
        }

        public ActionResult Delete(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Indicacions
                            where e.IndicacionId == id
                            select e;
                context.Indicacions.Remove(model.FirstOrDefault());
                context.SaveChanges();
                return RedirectToAction("Index", "admin/indicacion");
            }
        }
    }
}