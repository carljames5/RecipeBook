using Application.BusinessLogicLayer.Engines;
using Application.BusinessLogicLayer.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Angular_RecipeBook_BackEnd.Core.Configurations
{
    public static class BusinessEngineConfiguration
    {
        public static IServiceCollection ConfigureBusinessEngines(this IServiceCollection services)
        {
            services.AddScoped<IRecipeEngine, RecipeEngine>();
            services.AddScoped<IShoppingListEngine, ShoppingListEngine>();

            return services;
        }
    }
}
