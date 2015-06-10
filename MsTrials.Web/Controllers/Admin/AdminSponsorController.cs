using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MsTrials.Web.Models;

namespace MsTrials.Web.Controllers
{
    [Authorize]
    public class AdminSponsorController : CultureController
    {
        private string partialRoute = "~/Views/Admin/Sponsor/";
        // GET: Admin5
        public ActionResult Index()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Sponsors
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
                var model = from e in context.Sponsors
                            where e.SponsorId == id
                            select e;
                return View(partialRoute + "AddEdit.cshtml", model.FirstOrDefault());
            }
        }

        [HttpPost]
        public ActionResult AddEdit(int? sponsorId, string descripcion)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                if (sponsorId == null)
                {
                    Sponsor sponsor = new Sponsor();
                    sponsor.Nombre = descripcion;

                    context.Sponsors.Add(sponsor);
                    context.SaveChanges();
                }
                else
                {
                    var estudios = from Sponsor e in context.Sponsors
                                 where e.SponsorId == sponsorId
                                 select e;

                    if (estudios.Count() > 0)
                    {
                        Sponsor sponsor = estudios.First();
                        sponsor.Nombre = descripcion;
                        context.SaveChanges();
                    }
                }
                return RedirectToAction("Index", "admin/sponsor");
            }
        }

        public ActionResult Delete(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Sponsors
                            where e.SponsorId == id
                            select e;
                context.Sponsors.Remove(model.FirstOrDefault());
                context.SaveChanges();
                return RedirectToAction("Index", "admin/sponsor");
            }
        }
    }
}