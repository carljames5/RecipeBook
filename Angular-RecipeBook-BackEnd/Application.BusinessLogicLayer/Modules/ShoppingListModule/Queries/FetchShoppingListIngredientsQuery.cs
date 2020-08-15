using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels;
using Application.Core.Constants;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Queries
{
    public class FetchShoppingListIngredientsQuery : IRequest<FetchShoppingListIngredientsResponseModel>
    { }

    public class FetchShoppingListIngredientsQueryHandler : QueryBase<FetchShoppingListIngredientsQuery, FetchShoppingListIngredientsResponseModel>
    {
        public FetchShoppingListIngredientsQueryHandler(RecipeBookReadOnlyDbContext context) : base(context)
        { }

        public override async Task<FetchShoppingListIngredientsResponseModel> Handle(FetchShoppingListIngredientsQuery request, CancellationToken cancellationToken)
        {
            FetchShoppingListIngredientsResponseModel result = new FetchShoppingListIngredientsResponseModel();

            ApplicationUser user = await Context.Users
                .Where(x => x.NormalizedUserName == ApplicationAdminUserConstants.UserMeta.USERNAME.ToUpper())
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user)); // TODO UserNotFoundException!
            }

            result.ShoppingListIngredients = await Context.ShoppingLists
                .Include(x => x.User)
                .Include(x => x.Ingredient)
                .Where(x => x.User == user)
                .Select(x => new ShoppingListIngredientListItemResponseModel
                {
                    Name = x.Ingredient.Name,
                    Amount = x.Amount
                }).ToListAsync(cancellationToken);

            return result;
        }
    }
}
