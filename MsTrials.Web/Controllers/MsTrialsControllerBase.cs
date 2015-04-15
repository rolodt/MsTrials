using Abp.Web.Mvc.Controllers;

namespace MsTrials.Web.Controllers
{
    /// <summary>
    /// Derive all Controllers from this class.
    /// </summary>
    public abstract class MsTrialsControllerBase : AbpController
    {
        protected MsTrialsControllerBase()
        {
            LocalizationSourceName = MsTrialsConsts.LocalizationSourceName;
        }
    }
}