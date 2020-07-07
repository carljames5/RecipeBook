using Microsoft.AspNetCore.Identity;

namespace Data.DataAccessLayer.Entities
{
    public class RecipeBookAppUser : IdentityUser<string>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
