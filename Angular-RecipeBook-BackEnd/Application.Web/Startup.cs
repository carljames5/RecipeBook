using Application.Core.AppSettingsConfiguration.Constants;
using Application.Core.AppSettingsConfiguration.Enums;
using Application.Core.AppSettingsConfiguration.Models;
using Application.DataAccessLayer.Context;
using Application.Web.Core.Configurations;
using Application.Web.Core.Extensions;
using Application.Web.Core.Providers;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Application.Web
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CorsConfigurationModel>(_configuration.GetSection(ConfigurationConstants.CONFIGURATIONS[ConfigurationType.CorsConfiguration]));

            services.AddDbContext<RecipeBookDbContext>(options =>
                options.UseSqlServer(
                    _configuration.GetConnectionString("DevConnection")
                )
            );

            services.ConfigureReadOnlyDbContext();
            services.ConfigureMediatR();

            services.AddHttpContextAccessor();

            services.ConfigureAuthService();
            services.ConfigureApplicationCookies();

            services.AddScopedServices();

            services.AddCors();
            services.AddControllers();

            services.AddSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IOptions<CorsConfigurationModel> corsConfiguration)
        {
            app.AddApiExceptionHandler();

            app.UseCors(builder => builder.WithOrigins(corsConfiguration.Value.SpecifiedOrigins)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(o =>
            {
                o.SwaggerEndpoint("/swagger/v1/swagger.json", "Angular RecipeBook API v1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
