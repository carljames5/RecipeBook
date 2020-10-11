using Application.Core.Exceptions;

namespace Application.Core.Helpers
{
    public static class CurrentUserServiceHelper
    {
        public static int UserIdParser(string userId)
        {
            bool parsingResult = int.TryParse(userId, out int result);

            if (!parsingResult)
            {
                throw new RecipeBookException(RecipeBookExceptionCode.InvalidAuthorizedUserId, $"The user id is not an integer value! Parsed user id: {userId}");
            }

            return result;
        }
    }
}
