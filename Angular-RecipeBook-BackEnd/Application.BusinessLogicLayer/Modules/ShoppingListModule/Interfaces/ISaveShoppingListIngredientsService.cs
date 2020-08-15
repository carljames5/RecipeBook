using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.InitialNewShoppingListIngredients;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.RemoveExistingShoppingList;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces
{
    public interface ISaveShoppingListIngredientsService
    {
        Task RemoveExistingShoppingList(RemoveExistingShoppingListDto model);

        Task<IEnumerable<ShoppingList>> InitialNewShoppingListIngredients(InitialNewShoppingListIngredientsDto model);
    }
}
