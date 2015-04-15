using Abp.Application.Services;

namespace MsTrials
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class MsTrialsAppServiceBase : ApplicationService
    {
        protected MsTrialsAppServiceBase()
        {
            LocalizationSourceName = MsTrialsConsts.LocalizationSourceName;
        }
    }
}