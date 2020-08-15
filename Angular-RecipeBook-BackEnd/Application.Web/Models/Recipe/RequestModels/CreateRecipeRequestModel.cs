using System.Collections.Generic;

namespace Application.Web.Models.Recipe.RequestModels
{
    public class CreateRecipeRequestModel : RecipeBaseModel
    {
        public List<CreateRecipeIngredientRequestModel> Ingredients { get; set; }
    }
}
