using Application.Core.Exceptions.Constants;
using Application.Core.Exceptions.Enums;

namespace Application.Core.Exceptions.Models
{
    public class ApiErrorModel
    {
        public ApiExceptionCode ExceptionCode { get; }

        public string Message { get; }

        public string Exception { get; }

        public ApiErrorModel(ApiException ex, bool isDevelopmentEnvironment)
        {
            ExceptionCode = ex.ExceptionCode;
            Message = ex.Message;
            Exception = isDevelopmentEnvironment ? ex.ToString() : ApiErrorConstants.NON_DEVELOPMENT_EXCEPTION_MESSAGE;
        }
    }
}
