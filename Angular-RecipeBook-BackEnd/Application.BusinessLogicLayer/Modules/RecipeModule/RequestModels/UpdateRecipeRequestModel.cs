using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class UpdateRecipeRequestModel
    {
        [Required(ErrorMessage = "The Recipe ID is required!")]
        public int Id { get; set; }

        [Required(ErrorMessage = "The Recipe Name field must be required!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Descreption field must be required!")]
        public string Description { get; set; }

        [Required(ErrorMessage = "The Image Path field must be required!")]
        public string ImagePath { get; set; }

        public List<UpdateRecipeIngredientListItemRequestModel> Ingredients { get; set; }

        public UpdateRecipeRequestModel()
        {
            Ingredients = new List<UpdateRecipeIngredientListItemRequestModel>();
        }
    }
}
