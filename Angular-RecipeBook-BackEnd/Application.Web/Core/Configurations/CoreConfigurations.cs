using System.Linq;
using System.Reflection;
using Application.BusinessLogicLayer;
using Application.BusinessLogicLayer.Interfaces;
using Application.Core;
using Application.Core.Helpers;
using Application.DataAccessLayer.Context;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Web.Core.Configurations
{
    public static class CoreConfigurations
    {
        public static IServiceCollection ConfigureReadOnlyDbContext(this IServiceCollection services)
        {
            services.AddScoped<RecipeBookReadOnlyDbContext>();

            return services;
        }

        public static IServiceCollection ConfigureMediatR(this IServiceCollection services)
        {
            Assembly bllAssembly = typeof(Startup).Assembly.GetReferencedAssemblies()
                .Where(x => x.Name == AssemblyHelper<IBusinessLogicLayerAssembly>.AssemblyName)
                .Select(Assembly.Load)
                .Single();

            services.AddMediatR(bllAssembly);

            return services;
        }
    }
}
