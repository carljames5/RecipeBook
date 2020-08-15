using System.Threading.Tasks;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;

namespace Data.DataAccessLayer.DataMigration.Interfaces
{
    public interface IUserMigrationInitial
    {
        Task SeedAsync(RecipeBookContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager);
    }
}
