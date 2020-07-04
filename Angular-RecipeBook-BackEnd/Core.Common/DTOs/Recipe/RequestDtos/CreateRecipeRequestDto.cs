using System.Collections.Generic;

namespace Core.Common.DTOs.Recipe.RequestDtos
{
    public class CreateRecipeRequestDto : RecipeBaseDto
    {
        public List<CreateRecipeIngredientRequestDto> RecipeIngredients { get; set; }
    }
}
