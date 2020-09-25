using System;

namespace Application.Core.Exceptions
{
    public class RecipeBookException : Exception
    {
        public RecipeBookExceptionCode RecipeBookExceptionCode { get; set; }

        public RecipeBookException() { }

        public RecipeBookException(string message) : base(message) { }

        public RecipeBookException(string message, Exception innerException) : base(message, innerException) { }

        public RecipeBookException(RecipeBookExceptionCode recipeBookExceptionCode)
        {
            RecipeBookExceptionCode = recipeBookExceptionCode;
        }

        public RecipeBookException(RecipeBookExceptionCode recipeBookExceptionCode, string message) : base(message)
        {
            RecipeBookExceptionCode = recipeBookExceptionCode;
        }

        public RecipeBookException(RecipeBookExceptionCode recipeBookExceptionCode, string message, Exception innerException) : base(message, innerException)
        {
            RecipeBookExceptionCode = recipeBookExceptionCode;
        }
    }
}
