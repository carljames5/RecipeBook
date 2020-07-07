using System;
using System.Linq;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.DataMigration.Interfaces;
using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace Data.DataAccessLayer.DataMigration
{
    public class UserInitial : IMigrationInitial
    {
        public void Seed(RecipeBookContext context)
        {
            string[] roles = { "Administrator" };

            RecipeBookAppUser user = new RecipeBookAppUser
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Administrator",
                LastName = "Technical",
                Email = "admin@recipebook.com",
                UserName = "admin",
                EmailConfirmed = true
            };

            if (!context.Users.Any(x => x.UserName.ToLower() == user.UserName.ToLower()))
            {
                user.PasswordHash = new PasswordHasher<RecipeBookAppUser>().HashPassword(user, "techadmin2020");

                UserStore<RecipeBookAppUser> userStore = new UserStore<RecipeBookAppUser>(context);

                userStore.CreateAsync(user);

                foreach (string role in roles)
                {
                    RoleStore<RecipeBookAppRole> roleStore = new RoleStore<RecipeBookAppRole>(context);

                    if (!context.Roles.Any(x => x.Name.ToLower() == role.ToLower()))
                    {
                        roleStore.CreateAsync(new RecipeBookAppRole(role));
                    }
                }

                userStore.AddToRoleAsync(user, roles.FirstOrDefault(x => x.ToLower() == "Administrator"));

                context.SaveChangesAsync();
            }
        }
    }
}
