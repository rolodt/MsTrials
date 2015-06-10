using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MsTrials.Startup))]
namespace MsTrials
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            app.MapSignalR();

        }
    }
}
