using System.Threading.Tasks;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.DataAccessLayer.DataMigration.Interfaces
{
    public interface IUserMigrationInitial
    {
        Task SeedAsync(RecipeBookDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager);
    }
}
