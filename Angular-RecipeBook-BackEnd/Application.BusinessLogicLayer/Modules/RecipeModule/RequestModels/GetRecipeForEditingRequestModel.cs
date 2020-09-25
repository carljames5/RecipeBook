using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels
{
    public class GetRecipeForEditingRequestModel
    {
        [Required(ErrorMessage = "The ID of the Recipe to be edited is Required!")]
        public int Id { get; set; }
    }
}
