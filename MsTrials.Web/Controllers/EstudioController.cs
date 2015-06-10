using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Globalization;

namespace MsTrials.Web.Controllers
{
    public class EstudioController : CultureController
    {
        private string partialRoute = "~/Views/Estudio/";
        public ActionResult Index()
        {
            return View(partialRoute + "estudios.cshtml");
        }
        public ActionResult edit(string id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                ViewBag.estudioId = (from e in context.Estudios where e.Nombre == id select e.EstudioId).FirstOrDefault();
                return View(partialRoute + "estudio.cshtml");
            }
        }
	}
}