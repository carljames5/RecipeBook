using System.Collections.Generic;

namespace Angular_RecipeBook_BackEnd.Models.Recipe.ResponseModels
{
    public class GetRecipeByIdResponseModel : RecipeBaseModel
    {
        public int Id { get; set; }

        public List<GetRecipeIngredientResponseModel> Ingredients { get; set; }
    }
}
