using System.Threading;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeValidatorService
{
    public class RecipeNameIsExistDto
    {
        public int? RecipeId { get; }

        public string RecipeName { get; }

        public CancellationToken CancellationToken { get; }

        public RecipeNameIsExistDto(int? recipeId, string recipeName, CancellationToken cancellationToken)
        {
            RecipeId = recipeId;
            RecipeName = recipeName;
            CancellationToken = cancellationToken;
        }
    }
}
