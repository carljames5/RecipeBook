using System.ComponentModel.DataAnnotations;

namespace Application.BusinessLogicLayer.Modules.Authentication.RequestModels
{
    public class SignInRequestModel
    {
        [Required(ErrorMessage = "The User Name field is required!")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "The Password field is required!")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Persistent selection is mandatory!")]
        public bool? IsPersistent { get; set; }
    }
}
