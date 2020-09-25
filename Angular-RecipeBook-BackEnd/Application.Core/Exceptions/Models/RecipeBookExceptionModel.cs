using Application.Core.Exceptions.Constants;

namespace Application.Core.Exceptions.Models
{
    public class RecipeBookExceptionModel
    {
        public RecipeBookExceptionCode ExceptionCode { get; }

        public string Message { get; }

        public string Exception { get; }

        public RecipeBookExceptionModel(RecipeBookException ex, bool isDevelopmentEnvironment)
        {
            ExceptionCode = ex.RecipeBookExceptionCode;
            Message = ex.Message;
            Exception = isDevelopmentEnvironment ? ex.ToString() : RecipeBookExceptionConstants.NON_DEVELOPMENT_EXCEPTION_MESSAGE;
        }
    }
}
