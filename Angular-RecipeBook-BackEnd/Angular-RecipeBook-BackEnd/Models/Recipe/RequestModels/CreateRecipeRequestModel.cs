using System.Collections.Generic;

namespace Angular_RecipeBook_BackEnd.Models.Recipe.RequestModels
{
    public class CreateRecipeRequestModel : RecipeBaseModel
    {
        public List<CreateRecipeIngredientRequestModel> Ingredients { get; set; }
    }
}
