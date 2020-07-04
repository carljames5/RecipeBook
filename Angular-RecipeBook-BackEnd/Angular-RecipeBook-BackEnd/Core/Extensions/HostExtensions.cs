using System;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Angular_RecipeBook_BackEnd.Core.Extensions
{
    public static class HostExtensions
    {
        public static IHost MigrateDatabase(this IHost host)
        {
            using (IServiceScope scope = host.Services.CreateScope())
            {
                IServiceProvider serviceProvider = scope.ServiceProvider;
                RecipeBookContext context = serviceProvider.GetRequiredService<RecipeBookContext>();

                context.InitDatabase();
            }

            return host;
        }
    }
}
