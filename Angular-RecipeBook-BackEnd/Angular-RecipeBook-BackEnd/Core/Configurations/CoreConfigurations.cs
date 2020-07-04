using Core.ApplicationCore.UnitOfWork;
using Microsoft.Extensions.DependencyInjection;

namespace Angular_RecipeBook_BackEnd.Core.Configurations
{
    public static class CoreConfigurations
    {
        public static IServiceCollection ConfiguraCoreModules(this IServiceCollection services)
        {
            services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));

            return services;
        }
    }
}
