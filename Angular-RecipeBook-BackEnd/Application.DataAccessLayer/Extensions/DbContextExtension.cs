using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.DataMigration;
using Application.DataAccessLayer.DataMigration.Interfaces;
using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.DataAccessLayer.Extensions
{
    public static class DotnetCoreBaseDbContextExtensions
    {
        private static RecipeBookDbContext _context;

        private static UserManager<ApplicationUser> _userManager;

        private static RoleManager<ApplicationRole> _roleManager;

        public static async Task InitDatabase(this RecipeBookDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));

            context.Database.Migrate();

            await Seed();
        }

        private static async Task Seed()
        {
            Type[] dataMigrations = Assembly.GetAssembly(typeof(IUserMigrationInitial))
                .GetTypes()
                .Where(t => t.GetInterfaces().Contains(typeof(IUserMigrationInitial)))
                .ToArray();

            Type userInitial = dataMigrations.FirstOrDefault(x => x == typeof(UserMigrationInitial));
            IUserMigrationInitial userMigrationInitial = (IUserMigrationInitial)Activator.CreateInstance(userInitial ?? throw new ArgumentNullException(nameof(userInitial)));

            await userMigrationInitial.SeedAsync(_context, _userManager, _roleManager);
        }
    }
}
