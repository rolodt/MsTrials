using Abp.Web.Mvc.Controllers;
using System;
using System.Globalization;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace MsTrials.Web.Controllers
{
    /// <summary>
    /// Derive all Controllers from this class.
    /// </summary>
    public abstract class CultureController : AbpController
    {
        private string defaultCulture = "es-ES";
        protected CultureController()
        {
            LocalizationSourceName = MsTrialsConsts.LocalizationSourceName;
        }

        protected override bool DisableAsyncSupport
        {
            get { return true; }
        }

        protected override void ExecuteCore()
        {
            var cookie = HttpContext.Request.Cookies["myappculture"];
            if (cookie != null)
                SetCulture(cookie.Value);
            else
                SetCulture(defaultCulture);

            base.ExecuteCore();
        }

        protected void SetCulture(string lang)
        {
            CultureInfo ci = new CultureInfo(lang);
            System.Threading.Thread.CurrentThread.CurrentUICulture = ci;
            System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(ci.Name);

            // save the location into cookie
            HttpCookie _cookie = new HttpCookie("myappculture", Thread.CurrentThread.CurrentUICulture.Name);
            _cookie.Expires = DateTime.Now.AddYears(1);
            HttpContext.Response.SetCookie(_cookie);
        }

        public ActionResult ChangeCulture(string lang)
        {
            SetCulture(lang);

            return Redirect(Request.UrlReferrer.ToString());
        }
    }
}