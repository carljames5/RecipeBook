using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class GetRecipeForEditingRequestModel
    {
        [Required]
        public int Id { get; set; }
    }
}
