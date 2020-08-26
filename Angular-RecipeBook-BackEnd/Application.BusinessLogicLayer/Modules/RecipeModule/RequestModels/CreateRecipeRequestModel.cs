using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class CreateRecipeRequestModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public List<CreateRecipeIngredientListItemRequestModel> Ingredients { get; set; }
    }
}
