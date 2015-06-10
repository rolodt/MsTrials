using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Globalization;

namespace MsTrials.Web.Controllers
{
    public class AutorController : CultureController
    {
        private string partialRoute = "~/Views/Autor/";
        public ActionResult Index()
        {
            return View(partialRoute + "autores.cshtml");
        }

        /*public ActionResult ChangeCulture(string lang)
        {
            base.SetCulture(lang);

            return Redirect(Request.UrlReferrer.ToString());
        }*/
	}
}