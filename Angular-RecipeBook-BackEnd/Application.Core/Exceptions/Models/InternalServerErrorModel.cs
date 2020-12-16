using System;
using Application.Core.Exceptions.Constants;

namespace Application.Core.Exceptions.Models
{
    public class InternalServerErrorModel
    {
        public string Message { get; }

        public string Exception { get; }

        public InternalServerErrorModel(Exception ex, bool isDevelopmentEnvironment)
        {
            Message = ex.Message;
            Exception = isDevelopmentEnvironment ? ex.ToString() : InternalServerErrorConstants.NON_DEVELOPMENT_EXCEPTION_MESSAGE;
        }
    }
}
