namespace Application.Core.Exceptions
{
    public enum RecipeBookExceptionCode
    {
        None = 0,
        UserNotFound = 1,
        SignInUserNotFound = 2,
        UnauthorizedUser = 3,
        InvalidAuthorizedUserId = 4,
        UserIsLockedOut = 5,
        UserIsNotAllowed = 6,
        LoginFailed = 7,
        RecipeNotFound = 8,
        UpgradeableRecipeNotFound = 9,
        DeletableRecipeNotFound = 10,
        RecipeNameIsAlreadyExist = 11
    }
}
