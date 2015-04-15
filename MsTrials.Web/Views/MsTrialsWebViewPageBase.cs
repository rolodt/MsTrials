using Abp.Web.Mvc.Views;

namespace MsTrials.Web.Views
{
    public abstract class MsTrialsWebViewPageBase : MsTrialsWebViewPageBase<dynamic>
    {

    }

    public abstract class MsTrialsWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected MsTrialsWebViewPageBase()
        {
            LocalizationSourceName = MsTrialsConsts.LocalizationSourceName;
        }
    }
}