using System.Collections.Generic;

namespace Application.Core.DTOs.Recipe.RequestDtos
{
    public class CreateRecipeRequestDto : RecipeBaseDto
    {
        public List<CreateRecipeIngredientRequestDto> RecipeIngredients { get; set; }
    }
}
