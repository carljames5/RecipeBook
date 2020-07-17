using System.Collections.Generic;

namespace Angular_RecipeBook_BackEnd.Models.ShoppingList.ResponseModels
{
    public class FetchShoppingListResponseModel
    {
        public List<FetchShoppingListIngredientItemResponseModel> ShoppingListIngredients { get; set; }
    }
}
