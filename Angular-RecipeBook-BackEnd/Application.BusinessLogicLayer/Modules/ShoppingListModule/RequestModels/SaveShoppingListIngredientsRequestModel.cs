using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels
{
    public class SaveShoppingListIngredientsRequestModel
    {
        public List<SaveShoppingListIngredientListItemRequestModel> ShoppingListIngredientListItems { get; set; }

        public SaveShoppingListIngredientsRequestModel()
        {
            ShoppingListIngredientListItems = new List<SaveShoppingListIngredientListItemRequestModel>();
        }
    }
}
