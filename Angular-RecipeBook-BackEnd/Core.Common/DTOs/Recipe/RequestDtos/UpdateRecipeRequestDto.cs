using System.Collections.Generic;

namespace Core.Common.DTOs.Recipe.RequestDtos
{
    public class UpdateRecipeRequestDto : RecipeBaseDto
    {
        public int Id { get; set; }

        public List<UpdateRecipeIngredientRequestDto> RecipeIngredients { get; set; }
    }
}
