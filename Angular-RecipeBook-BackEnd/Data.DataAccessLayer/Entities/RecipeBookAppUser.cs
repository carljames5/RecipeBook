using System.Collections.Generic;
using Data.DataAccessLayer.Entities.Core;
using Microsoft.AspNetCore.Identity;

namespace Data.DataAccessLayer.Entities
{
    public class RecipeBookAppUser : IdentityUser<int>, IEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<ShoppingList> ShoppingList { get; set; }

        public RecipeBookAppUser()
        {
            ShoppingList = new HashSet<ShoppingList>();
        }
    }
}
