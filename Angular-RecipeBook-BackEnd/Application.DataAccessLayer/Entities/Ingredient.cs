using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Application.DataAccessLayer.Entities.Core;

namespace Application.DataAccessLayer.Entities
{
    public class Ingredient : IEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }

        public ICollection<ShoppingList> ShoppingList { get; set; }

        public Ingredient()
        {
            RecipeIngredients = new HashSet<RecipeIngredient>();
            ShoppingList = new HashSet<ShoppingList>();
        }
    }
}
