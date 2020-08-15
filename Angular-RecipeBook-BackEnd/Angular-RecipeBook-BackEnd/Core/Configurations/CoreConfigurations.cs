using Data.DataAccessLayer.Context;
using Microsoft.Extensions.DependencyInjection;

namespace Angular_RecipeBook_BackEnd.Core.Configurations
{
    public static class CoreConfigurations
    {
        public static IServiceCollection ConfigureReadOnlyDbContext(this IServiceCollection services)
        {
            services.AddScoped<RecipeBookReadOnlyDbContext>();

            return services;
        }
    }
}
