using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core.DTOs.ShoppingList;

namespace Application.BusinessLogicLayer.Interfaces
{
    public interface IShoppingListEngine
    {
        Task SaveShoppingList(SaveShoppingListIngredientListDto model);

        List<FetchShoppingListIngredientListItemDto> FetchShoppingList();
    }
}
