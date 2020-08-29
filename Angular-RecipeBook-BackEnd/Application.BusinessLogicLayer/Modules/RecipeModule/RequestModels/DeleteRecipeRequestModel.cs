using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class DeleteRecipeRequestModel
    {
        [Required]
        public int? Id { get; set; }
    }
}
