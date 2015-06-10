using Abp.Web.Mvc.Controllers;
using System;
using System.Globalization;
using System.Threading;
using System.Web;

namespace MsTrials.Web.Controllers
{
    /// <summary>
    /// Derive all Controllers from this class.
    /// </summary>
    public abstract class BaseController : AbpController
    {
        protected BaseController()
        {
            LocalizationSourceName = MsTrialsConsts.LocalizationSourceName;
        }
    }
}