using System;
using System.Linq;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.DataMigration.Interfaces;
using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;


namespace Data.DataAccessLayer.DataMigration
{
    public class UserInitial : IMigrationInitial
    {
        public void Seed(RecipeBookContext context)
        {
            if (!context.Users.Any(x => x.NormalizedUserName == "ADMIN"))
            {
                RecipeBookAppUser user = new RecipeBookAppUser
                {
                    Id = 1,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    FirstName = "Administrator",
                    LastName = "Technical",
                    Email = "admin@recipebook.com",
                    UserName = "admin",
                    EmailConfirmed = true,
                    LockoutEnabled = false,
                    NormalizedUserName = "ADMIN"
                };
                user.PasswordHash = new PasswordHasher<RecipeBookAppUser>().HashPassword(user, "techadmin2020");
                context.Users.Add(user);
            
                string adminRole = "Administrator";
                var role = new RecipeBookAppRole
                {
                    Id = 1,
                    Name = adminRole,
                    NormalizedName = adminRole.ToUpper()
                };
            
                context.Roles.Add(role);
            
                context.SaveChanges();

                context.UserRoles.Add(new IdentityUserRole<int>
                {
                    RoleId = role.Id,
                    UserId = user.Id
                });
                context.SaveChanges();
            }
        }
    }
}
