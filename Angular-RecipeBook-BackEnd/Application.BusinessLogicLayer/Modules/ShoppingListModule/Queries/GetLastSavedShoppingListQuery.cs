using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels;
using Application.Core.Constants;
using Application.Core.Exceptions;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Queries
{
    public class GetLastSavedShoppingListQuery : IRequest<GetLastSavedShoppingListResponseModel>
    { }

    public class GetLastSavedShoppingListQueryHandler : QueryBase<GetLastSavedShoppingListQuery, GetLastSavedShoppingListResponseModel>
    {
        public GetLastSavedShoppingListQueryHandler(RecipeBookReadOnlyDbContext context) : base(context)
        { }

        public override async Task<GetLastSavedShoppingListResponseModel> Handle(GetLastSavedShoppingListQuery request, CancellationToken cancellationToken)
        {
            GetLastSavedShoppingListResponseModel result = new GetLastSavedShoppingListResponseModel();

            ApplicationUser user = await Context.Users
                .Where(x => x.NormalizedUserName == ApplicationAdminUserConstants.UserMeta.USERNAME.ToUpper())
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                throw new RecipeBookException(RecipeBookExceptionCode.UserNotFound,
                    $"User not found in database! {nameof(ApplicationAdminUserConstants.UserMeta.USERNAME)}: {ApplicationAdminUserConstants.UserMeta.USERNAME.ToUpper()}"); // TODO Replace it UserId
            }

            result.Ingredients = await Context.ShoppingLists
                .Include(x => x.User)
                .Include(x => x.Ingredient)
                .Where(x => x.User == user)
                .Select(x => new GetLastSavedShoppingListIngredientListItemResponseModel
                {
                    Name = x.Ingredient.Name,
                    Amount = x.Amount
                }).ToListAsync(cancellationToken);

            return result;
        }
    }
}
