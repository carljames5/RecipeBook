using System.Collections.Generic;

namespace Application.Web.Models.Recipe.RequestModels
{
    public class UpdateRecipeRequestModel : RecipeBaseModel
    {
        public int Id { get; set; }

        public List<UpdateRecipeIngredientRequestModel> Ingredients { get; set; }
    }
}
