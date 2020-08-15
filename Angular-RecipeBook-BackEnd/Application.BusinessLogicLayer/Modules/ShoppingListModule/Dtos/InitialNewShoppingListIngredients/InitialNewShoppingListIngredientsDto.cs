using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.InitialNewShoppingListIngredients
{
    public class InitialNewShoppingListIngredientsDto
    {
        public ApplicationUser ApplicationUser { get; }

        public IEnumerable<NewShoppingListIngredientListItemDto> NewShoppingListIngredients { get; }

        public CancellationToken CancellationToken { get; }

        public InitialNewShoppingListIngredientsDto(ApplicationUser applicationUser,
                                                    IEnumerable<SaveShoppingListIngredientListItemRequestModel> saveShoppingListIngredientListRequestModel,
                                                    CancellationToken cancellationToken)
        {
            ApplicationUser = applicationUser;
            CancellationToken = cancellationToken;
            NewShoppingListIngredients = saveShoppingListIngredientListRequestModel
                .Select(x => new NewShoppingListIngredientListItemDto(x.Name, x.Amount)).ToList();
        }
    }
}
