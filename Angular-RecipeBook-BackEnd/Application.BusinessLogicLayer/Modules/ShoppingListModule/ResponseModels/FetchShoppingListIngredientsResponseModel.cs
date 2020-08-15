using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels
{
    public class FetchShoppingListIngredientsResponseModel
    {
        public List<ShoppingListIngredientListItemResponseModel> ShoppingListIngredients { get; set; }
    }
}
