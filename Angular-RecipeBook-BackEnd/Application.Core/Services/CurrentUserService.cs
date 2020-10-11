using System;
using System.Security.Claims;
using Application.Core.Exceptions;
using Application.Core.Helpers;
using Application.Core.Interfaces.Services;
using Microsoft.AspNetCore.Http;

namespace Application.Core.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly HttpContext _httpContext;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public int GetAuthorizedUserId()
        {
            string userId = _httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new RecipeBookException(RecipeBookExceptionCode.UnauthorizedUser, "The user performing the operation is unauthorized!");
            }

            int result = CurrentUserServiceHelper.UserIdParser(userId);

            return result;
        }
    }
}
