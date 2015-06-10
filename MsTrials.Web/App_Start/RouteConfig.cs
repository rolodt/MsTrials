using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace MsTrials.Web
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            /*routes.MapRoute(
                name: "ApiEstudio",
                url: "api/estudio/{action}/{id}",
                defaults: new { controller = "ApiEstudio", action="Index", id = UrlParameter.Optional }
            );*/

            //ASP.NET Web API Route Config
            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            routes.MapRoute(
                name: "AdminEstudio",
                url: "admin/estudio/{action}/{id}",
                defaults: new { controller = "AdminEstudio", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AdminAutor",
                url: "admin/autor/{action}/{id}",
                defaults: new { controller = "AdminAutor", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AdminComparador",
                url: "admin/comparador/{action}/{id}",
                defaults: new { controller = "AdminComparador", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AdminIndicacion",
                url: "admin/indicacion/{action}/{id}",
                defaults: new { controller = "AdminIndicacion", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AdminMedicamento",
                url: "admin/medicamento/{action}/{id}",
                defaults: new { controller = "AdminMedicamento", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AdminSponsor",
                url: "admin/sponsor/{action}/{id}",
                defaults: new { controller = "AdminSponsor", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AdminDefault",
                url: "admin",
                defaults: new { controller = "AdminEstudio", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );    
            
        }
    }
}
