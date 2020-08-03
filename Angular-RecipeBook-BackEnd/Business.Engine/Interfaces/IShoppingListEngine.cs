using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.DTOs.ShoppingList;

namespace Business.Engine.Interfaces
{
    public interface IShoppingListEngine
    {
        Task SaveShoppingList(List<SaveShoppingListIngredientItemDto> shoppingListIngredients);

        List<FetchShoppingListIngredientListItemDto> FetchShoppingList();
    }
}
