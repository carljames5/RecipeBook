using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class UpdateRecipeRequestModel
    {
        [Required]
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImagePath { get; set; }

        public List<UpdateRecipeIngredientListItemRequestModel> Ingredients { get; set; }

        public UpdateRecipeRequestModel()
        {
            Ingredients = new List<UpdateRecipeIngredientListItemRequestModel>();
        }
    }
}
