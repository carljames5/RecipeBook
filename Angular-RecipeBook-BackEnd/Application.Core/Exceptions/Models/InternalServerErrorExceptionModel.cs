using System;
using Application.Core.Exceptions.Constants;

namespace Application.Core.Exceptions.Models
{
    public class InternalServerErrorExceptionModel
    {
        public string Message { get; }

        public string Exception { get; }

        public InternalServerErrorExceptionModel(Exception ex, bool isDevelopmentEnvironment)
        {
            Message = ex.Message;
            Exception = isDevelopmentEnvironment ? ex.ToString() : InternalServerErrorExceptionConstants.NON_DEVELOPMENT_EXCEPTION_MESSAGE;
        }
    }
}
