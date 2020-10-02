namespace Application.Core.Exceptions
{
    public enum RecipeBookExceptionCode
    {
        None = 0,
        UserNotFound = 1,
        SignInUserNotFound = 2,
        UserIsLockedOut = 3,
        UserIsNotAllowed = 4,
        LoginFailed = 5,
        RecipeNotFound = 6,
        UpgradeableRecipeNotFound = 7,
        DeletableRecipeNotFound = 8,
    }
}
