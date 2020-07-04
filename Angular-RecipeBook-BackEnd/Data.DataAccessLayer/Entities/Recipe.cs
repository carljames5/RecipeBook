using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Data.DataAccessLayer.Entities.Core;

namespace Data.DataAccessLayer.Entities
{
    public class Recipe : IEntity
    {
        [Key]
        public int RecipeId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImagePath { get; set; }

        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }

        public Recipe()
        {
            RecipeIngredients = new HashSet<RecipeIngredient>();
        }
    }
}
