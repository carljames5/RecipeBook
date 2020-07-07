using System;
using System.Linq;
using System.Reflection;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.DataMigration;
using Data.DataAccessLayer.DataMigration.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.DataAccessLayer.Extensions
{
    public static class DotnetCoreBaseDbContextExtensions
    {
        public static void InitDatabase(this RecipeBookContext context)
        {
            context.Database.Migrate();

            Seed(context);
        }

        private static void Seed(RecipeBookContext context)
        {
            Type[] dataMigrations = Assembly.GetAssembly(typeof(IMigrationInitial))
                .GetTypes()
                .Where(t => t.GetInterfaces().Contains(typeof(IMigrationInitial)))
                .ToArray();

            Type userInitial = dataMigrations.FirstOrDefault(x => x == typeof(UserInitial));
            IMigrationInitial dataMigration = (IMigrationInitial)Activator.CreateInstance(userInitial ?? throw new ArgumentNullException(nameof(userInitial)));
            dataMigration.Seed(context);
        }
    }
}
