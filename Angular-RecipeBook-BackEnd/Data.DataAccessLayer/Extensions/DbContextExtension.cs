using Data.DataAccessLayer.Context;
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
        { }
    }
}
