using System.Web.Mvc;

namespace MsTrials.Web.Controllers
{
    public class HomeController : MsTrialsControllerBase
    {
        public ActionResult Index()
        { 
            return View("~/App/Main/views/layout/layout.cshtml"); //Layout of the angular application.
        }
	}
}