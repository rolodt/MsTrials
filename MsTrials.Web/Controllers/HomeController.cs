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
        //private string partialRoute = "~/Views/Autor/";
        public ActionResult Index()
        { 
            return View();
        }

        /*public ActionResult GetAllAuthors()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Autors
                            select e;
                return View(partialRoute + "autores.cshtml", model.ToList());
            }
        }

        public ActionResult GetAuthorsView()
        {
            return View(partialRoute + "autores.cshtml");
        }*/
	}
}