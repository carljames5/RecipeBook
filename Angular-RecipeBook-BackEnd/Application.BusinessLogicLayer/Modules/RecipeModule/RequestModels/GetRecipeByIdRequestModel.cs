using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class GetRecipeByIdRequestModel
    {
        [Required]
        public int? Id { get; set; }
    }
}
