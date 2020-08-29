using System.ComponentModel.DataAnnotations;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Constants;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels
{
    public class SaveShoppingListIngredientListItemRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Range(ShoppingListModuleConstants.RangeValues.INGREDIENT_AMOUNT_MIN_VALUE, ShoppingListModuleConstants.RangeValues.INGREDIENT_AMOUNT_MAX_VALUE,
            ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public int Amount { get; set; }
    }
}
