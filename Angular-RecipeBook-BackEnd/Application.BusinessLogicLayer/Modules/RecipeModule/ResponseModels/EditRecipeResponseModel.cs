using System.Collections.Generic;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels
{
    public class EditRecipeResponseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public List<EditRecipeIngredientListItemResponseModel> Ingredients { get; set; }
    }
}
