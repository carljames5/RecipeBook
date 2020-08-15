using System.Linq;
using System.Threading.Tasks;
using Core.ApplicationCore.Constants;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.DataMigration.Interfaces;
using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;

namespace Data.DataAccessLayer.DataMigration
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
