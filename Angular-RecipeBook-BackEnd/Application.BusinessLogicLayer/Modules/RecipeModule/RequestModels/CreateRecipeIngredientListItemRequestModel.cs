using System.ComponentModel.DataAnnotations;
using Application.BusinessLogicLayer.Modules.RecipeModule.Constants;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class CreateRecipeIngredientListItemRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Range(RecipeModuleConstants.RangeValues.INGREDIENT_AMOUNT_MIN_VALUE, RecipeModuleConstants.RangeValues.INGREDIENT_AMOUNT_MAX_VALUE,
            ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public int Amount { get; set; }
    }
}
