using System.ComponentModel.DataAnnotations;
using Data.DataAccessLayer.Entities.Core;

namespace Data.DataAccessLayer.Entities
{
    public class ShoppingList : IEntity
    {
        [Required]
        public int UserId { get; set; }

        public RecipeBookAppUser User { get; set; }

        [Required]
        public int IngredientId { get; set; }

        public Ingredient Ingredient { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}
