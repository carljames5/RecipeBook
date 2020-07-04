using Angular_RecipeBook_BackEnd.Core.Configurations;
using AutoMapper;
using Data.DataAccessLayer.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Angular_RecipeBook_BackEnd
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
            SqliteConnection inMemorySqlite = new SqliteConnection(_configuration.GetConnectionString("DevConnection"));
            inMemorySqlite.Open();

            services.AddDbContext<RecipeBookContext>(options =>
                options.UseSqlite(inMemorySqlite));

            services.ConfiguraCoreModules();
            services.ConfigureBusinessEngines();

            services.AddCors();
            services.AddControllers();

            services.AddAutoMapper(typeof(Startup));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
