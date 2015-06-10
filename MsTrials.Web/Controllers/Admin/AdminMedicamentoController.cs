using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MsTrials.Web.Models;

namespace MsTrials.Web.Controllers
{
    [Authorize]
    public class AdminMedicamentoController : CultureController
    {
        private string partialRoute = "~/Views/Admin/Medicamento/";
        // GET: Admin5
        public ActionResult Index()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Medicamentoes
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
                var model = from e in context.Medicamentoes
                            where e.MedicamentoId == id
                            select e;
                return View(partialRoute + "AddEdit.cshtml", model.FirstOrDefault());
            }
        }

        [HttpPost]
        public ActionResult AddEdit(int? medicamentoId, string descripcion)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                if (medicamentoId == null)
                {
                    Medicamento medicamento = new Medicamento();
                    medicamento.Descripcion = descripcion;

                    context.Medicamentoes.Add(medicamento);
                    context.SaveChanges();
                }
                else
                {
                    var estudios = from Medicamento e in context.Medicamentoes
                                 where e.MedicamentoId == medicamentoId
                                 select e;

                    if (estudios.Count() > 0)
                    {
                        Medicamento medicamento = estudios.First();
                        medicamento.Descripcion = descripcion;
                        context.SaveChanges();
                    }
                }
                return RedirectToAction("Index", "admin/medicamento");
            }
        }

        public ActionResult Delete(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Medicamentoes
                            where e.MedicamentoId == id
                            select e;
                context.Medicamentoes.Remove(model.FirstOrDefault());
                context.SaveChanges();
                return RedirectToAction("Index", "admin/medicamento");
            }
        }
    }
}