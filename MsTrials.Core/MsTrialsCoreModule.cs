using System.Reflection;
using Abp.Modules;

namespace MsTrials
{
    public class MsTrialsCoreModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
