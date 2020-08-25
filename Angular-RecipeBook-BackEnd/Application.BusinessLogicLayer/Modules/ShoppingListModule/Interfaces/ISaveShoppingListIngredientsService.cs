using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces
{
    public interface ISaveShoppingListIngredientsService
    {
        Task<ICollection<ShoppingList>> InitialNewShoppingListIngredients(InitialNewShoppingListIngredientsDto modelDto);
    }
}
