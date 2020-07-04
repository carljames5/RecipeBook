using System.Collections.Generic;

namespace Angular_RecipeBook_BackEnd.Models.Recipe.RequestModels
{
    public class UpdateRecipeRequestModel : RecipeBaseModel
    {
        public int Id { get; set; }

        public List<UpdateRecipeIngredientRequestModel> Ingredients { get; set; }
    }
}
