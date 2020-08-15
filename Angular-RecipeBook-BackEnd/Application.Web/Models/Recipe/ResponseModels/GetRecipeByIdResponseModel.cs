using System.Collections.Generic;

namespace Application.Web.Models.Recipe.ResponseModels
{
    public class GetRecipeByIdResponseModel : RecipeBaseModel
    {
        public int Id { get; set; }

        public List<GetRecipeIngredientResponseModel> Ingredients { get; set; }
    }
}
