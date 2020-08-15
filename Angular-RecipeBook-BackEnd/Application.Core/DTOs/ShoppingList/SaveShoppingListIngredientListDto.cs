using System.Collections.Generic;

namespace Application.Core.DTOs.ShoppingList
{
    public class SaveShoppingListIngredientListDto
    {
        public List<SaveShoppingListIngredientListItemDto> ShoppingListIngredientListItems { get; set; }
    }
}
