using System.Collections.Generic;
using System.Threading;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos
{
    public class InitialNewShoppingListIngredientsDto
    {
        public IEnumerable<ShoppingListIngredientListItemDto> ShoppingListIngredients { get; }

        public CancellationToken CancellationToken { get; }

        public InitialNewShoppingListIngredientsDto(IEnumerable<ShoppingListIngredientListItemDto> shoppingListIngredients,
                                                    CancellationToken cancellationToken)
        {
            ShoppingListIngredients = shoppingListIngredients;
            CancellationToken = cancellationToken;
        }
    }
}
