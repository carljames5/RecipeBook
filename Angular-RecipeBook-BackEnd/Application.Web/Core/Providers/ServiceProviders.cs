using Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Web.Core.Providers
{
    public static class ServiceProviders
    {
        public static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<ISaveShoppingListIngredientsService, SaveShoppingListIngredientsService>();

            return services;
        }
    }
}
