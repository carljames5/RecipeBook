using System.Collections.Generic;
using System.Threading;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeIngredientService
{
    public class InitialNewRecipeIngredientsDto
    {
        public List<RecipeIngredientListItemDto> Ingredients { get; }

        public CancellationToken CancellationToken { get; }

        public InitialNewRecipeIngredientsDto(List<RecipeIngredientListItemDto> ingredients, CancellationToken cancellationToken)
        {
            Ingredients = ingredients;
            CancellationToken = cancellationToken;
        }
    }
}
