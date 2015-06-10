using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MsTrials.Web.Models;

namespace MsTrials.Web.Controllers
{
    [Authorize]
    public class AdminComparadorController : CultureController
    {
        private string partialRoute = "~/Views/Admin/Comparador/";
        // GET: Admin5
        public ActionResult Index()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Comparadors
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
                var model = from e in context.Comparadors
                            where e.ComparadorId == id
                            select e;
                return View(partialRoute + "AddEdit.cshtml", model.FirstOrDefault());
            }
        }

        [HttpPost]
        public ActionResult AddEdit(int? comparadorId, string descripcion)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                if (comparadorId == null)
                {
                    Comparador comparador = new Comparador();
                    comparador.Descripcion = descripcion;

                    context.Comparadors.Add(comparador);
                    context.SaveChanges();
                }
                else
                {
                    var comparadores = from Comparador e in context.Comparadors
                                 where e.ComparadorId == comparadorId
                                 select e;

                    if (comparadores.Count() > 0)
                    {
                        Comparador comparador = comparadores.FirstOrDefault();
                        comparador.Descripcion = descripcion;
                        context.SaveChanges();
                    }
                }
                return RedirectToAction("Index", "admin/comparador");
            }
        }

        public ActionResult Delete(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Comparadors
                            where e.ComparadorId == id
                            select e;
                context.Comparadors.Remove(model.FirstOrDefault());
                context.SaveChanges();
                return RedirectToAction("Index", "admin/comparador");
            }
        }
    }
}