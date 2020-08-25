using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class UpdateRecipeRequestModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public List<UpdateRecipeIngredientListItemRequestModel> Ingredients { get; set; }
    }
}
