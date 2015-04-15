using System.Reflection;
using Abp.Modules;

namespace MsTrials
{
    [DependsOn(typeof(MsTrialsCoreModule))]
    public class MsTrialsApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
