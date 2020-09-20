using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels
{
    public class SaveShoppingListRequestModel
    {
        public List<SaveShoppingListIngredientListItemRequestModel> Ingredients { get; set; }

        public SaveShoppingListRequestModel()
        {
            Ingredients = new List<SaveShoppingListIngredientListItemRequestModel>();
        }
    }
}
