using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Angular_RecipeBook_BackEnd.Core.Configurations
{
    public static class AuthenticationConfiguration
    {
        public static IServiceCollection ConfigureAuthService(this IServiceCollection services)
        {
            services.AddIdentity<RecipeBookAppUser, RecipeBookAppRole>(options =>
            {
                options.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<RecipeBookContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
            });

            return services;
        }
    }
}
