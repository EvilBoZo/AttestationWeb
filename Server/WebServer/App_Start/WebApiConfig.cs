using System.Web.Http;
using System.Web.Http.Routing.Constraints;

namespace WebServer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
        name: "RouteWithActionName",
        routeTemplate: "{controller}/{action}/{id}",
        defaults: new { id = RouteParameter.Optional },
        constraints: new { action = new AlphaRouteConstraint() }
        );

      config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}"
            );

        // отключаем возможность вывода данных в формате xml
        config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}
