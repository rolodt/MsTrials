using System.Reflection;
using Abp.Application.Services;
using Abp.Modules;
using Abp.WebApi;
using Abp.WebApi.Controllers.Dynamic.Builders;

namespace MsTrials
{
    [DependsOn(typeof(AbpWebApiModule), typeof(MsTrialsApplicationModule))]
    public class MsTrialsWebApiModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

            DynamicApiControllerBuilder
                .ForAll<IApplicationService>(typeof(MsTrialsApplicationModule).Assembly, "app")
                .Build();
        }
    }
}
