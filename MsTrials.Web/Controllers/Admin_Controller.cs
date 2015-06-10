using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;

namespace MsTrials.Web.Controllers
{
    [Authorize]
    public class Admin_Controller : CultureController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ChangeCulture(string lang)
        {
            base.SetCulture(lang);

            return Redirect(Request.UrlReferrer.ToString());
        }
    }
}