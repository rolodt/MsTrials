using System.Data.Entity;
using System.Reflection;
using Abp.EntityFramework;
using Abp.Modules;
using MsTrials.EntityFramework;

namespace MsTrials
{
    [DependsOn(typeof(AbpEntityFrameworkModule), typeof(MsTrialsCoreModule))]
    public class MsTrialsDataModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = "Default";
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
            Database.SetInitializer<MsTrialsDbContext>(null);
        }
    }
}
