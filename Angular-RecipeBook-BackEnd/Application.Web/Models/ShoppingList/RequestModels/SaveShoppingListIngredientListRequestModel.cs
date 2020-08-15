using System.Collections.Generic;

namespace Application.Web.Models.ShoppingList.RequestModels
{
    public class SaveShoppingListIngredientListRequestModel
    {
        public List<SaveShoppingListIngredientListItemRequestModel> ShoppingListIngredientListItems { get; set; }
    }
}
