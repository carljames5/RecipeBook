using Application.BusinessLogicLayer.Engines;
using Application.BusinessLogicLayer.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Web.Core.Configurations
{
    public static class BusinessEngineConfiguration
    {
        public static IServiceCollection ConfigureBusinessEngines(this IServiceCollection services)
        {
            services.AddScoped<IRecipeEngine, RecipeEngine>();

            return services;
        }
    }
}
