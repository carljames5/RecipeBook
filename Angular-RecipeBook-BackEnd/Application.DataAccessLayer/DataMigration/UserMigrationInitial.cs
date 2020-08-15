using System.Linq;
using System.Threading.Tasks;
using Application.Core.Constants;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.DataMigration.Interfaces;
using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.DataAccessLayer.DataMigration
{
    public class UserMigrationInitial : IUserMigrationInitial
    {
        public async Task SeedAsync(RecipeBookDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            if (!context.Users.Any(x => x.NormalizedUserName == ApplicationAdminUserConstants.UserMeta.USERNAME.ToUpper()))
            {
                ApplicationUser adminUser = new ApplicationUser
                {
                    FirstName = ApplicationAdminUserConstants.UserMeta.FIRST_NAME,
                    LastName = ApplicationAdminUserConstants.UserMeta.LAST_NAME,
                    Email = ApplicationAdminUserConstants.UserMeta.EMAIL,
                    UserName = ApplicationAdminUserConstants.UserMeta.USERNAME,
                    EmailConfirmed = true,
                    LockoutEnabled = false
                };

                ApplicationRole adminRole = new ApplicationRole
                {
                    Name = ApplicationAdminUserConstants.RoleMeta.NAME
                };

                IdentityResult createdUserResult = await userManager.CreateAsync(adminUser, ApplicationAdminUserConstants.UserMeta.PASSWORD);
                IdentityResult createdRoleResult = await roleManager.CreateAsync(adminRole);

                if (createdUserResult.Succeeded && createdRoleResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, ApplicationAdminUserConstants.RoleMeta.NAME);
                }
            }
        }
    }
}
