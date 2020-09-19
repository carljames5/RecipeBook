using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class RecipeNameIsExistRequestModel
    {
        public int? RecipeId { get; set; }

        [Required]
        public string RecipeName { get; set; }
    }
}
