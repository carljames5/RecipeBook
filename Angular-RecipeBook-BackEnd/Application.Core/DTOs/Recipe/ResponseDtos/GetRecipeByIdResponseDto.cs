using System.Collections.Generic;

namespace Application.Core.DTOs.Recipe.ResponseDtos
{
    public class GetRecipeByIdResponseDto : RecipeBaseDto
    {
        public int Id { get; set; }

        public List<GetRecipeByIdIngredientResponseDto> Ingredients { get; set; }
    }
}
