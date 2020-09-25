using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class CreateRecipeRequestModel
    {
        [Required(ErrorMessage = "The Recipe Name field must be required!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Descreption field must be required!")]
        public string Description { get; set; }

        [Required(ErrorMessage = "The Image Path field must be required!")]
        public string ImagePath { get; set; }

        public List<CreateRecipeIngredientListItemRequestModel> Ingredients { get; set; }

        public CreateRecipeRequestModel()
        {
            Ingredients = new List<CreateRecipeIngredientListItemRequestModel>();
        }
    }
}
