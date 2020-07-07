using Microsoft.AspNetCore.Identity;

namespace Data.DataAccessLayer.Entities
{
    public class RecipeBookAppRole : IdentityRole<string>
    {
        public RecipeBookAppRole(string name) : base()
        { }
    }
}
