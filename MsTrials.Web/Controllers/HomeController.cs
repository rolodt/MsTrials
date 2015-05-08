using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Globalization;

namespace MsTrials.Web.Controllers
{
    public class HomeController : CultureController
    {
        private string partialRoute = "~/Views/Autor/";
        public ActionResult Index()
        { 
            //return View("~/App/Main/views/layout/layout.cshtml"); //Layout of the angular application.
            return View();
        }

        public ActionResult ChangeCulture(string lang)
        {
            base.SetCulture(lang);

            return Redirect(Request.UrlReferrer.ToString());
        }

        public ActionResult GetAllAuthors()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Autors
                            select e;
                return View(partialRoute + "autores.cshtml", model.ToList());
            }
        }
	}
}