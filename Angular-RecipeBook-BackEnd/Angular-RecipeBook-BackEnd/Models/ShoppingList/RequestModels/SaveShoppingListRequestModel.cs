using System.Collections.Generic;

namespace Angular_RecipeBook_BackEnd.Models.ShoppingList.RequestModels
{
    public class SaveShoppingListRequestModel
    {
        public List<SaveShoppingListIngredientRequestModel> ShoppingListIngredients { get; set; }
    }
}
