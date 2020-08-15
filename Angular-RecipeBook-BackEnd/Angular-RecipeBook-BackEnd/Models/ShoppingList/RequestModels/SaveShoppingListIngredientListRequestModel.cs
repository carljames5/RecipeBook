using System.Collections.Generic;

namespace Angular_RecipeBook_BackEnd.Models.ShoppingList.RequestModels
{
    public class SaveShoppingListIngredientListRequestModel
    {
        public List<SaveShoppingListIngredientListItemRequestModel> ShoppingListIngredientListItems { get; set; }
    }
}
