using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.DTOs.ShoppingList;

namespace Application.BusinessLogicLayer.Interfaces
{
    public interface IShoppingListEngine
    {
        Task SaveShoppingList(SaveShoppingListIngredientListDto model);

        List<FetchShoppingListIngredientListItemDto> FetchShoppingList();
    }
}
