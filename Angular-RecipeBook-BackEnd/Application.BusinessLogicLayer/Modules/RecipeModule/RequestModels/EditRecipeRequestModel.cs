using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class EditRecipeRequestModel
    {
        [Required]
        public int? Id { get; set; }
    }
}
