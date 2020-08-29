using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class CreateRecipeRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImagePath { get; set; }

        public List<CreateRecipeIngredientListItemRequestModel> Ingredients { get; set; }

        public CreateRecipeRequestModel()
        {
            Ingredients = new List<CreateRecipeIngredientListItemRequestModel>();
        }
    }
}
