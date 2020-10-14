using System.ComponentModel.DataAnnotations;
using Application.DataAccessLayer.Entities.Interfaces;

namespace Application.DataAccessLayer.Entities
{
    public class RecipeIngredient : IEntity
    {
        [Required]
        public int RecipeId { get; set; }

        public Recipe Recipe { get; set; }

        [Required]
        public int IngredientId { get; set; }

        public Ingredient Ingredient { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}
