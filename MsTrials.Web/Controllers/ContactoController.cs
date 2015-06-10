using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Globalization;

namespace MsTrials.Web.Controllers
{
    public class ContactoController : CultureController
    {
        private string partialRoute = "~/Views/Contacto/";
        public ActionResult Index()
        { 
            return View(partialRoute + "contacto.cshtml");
        }
	}
}