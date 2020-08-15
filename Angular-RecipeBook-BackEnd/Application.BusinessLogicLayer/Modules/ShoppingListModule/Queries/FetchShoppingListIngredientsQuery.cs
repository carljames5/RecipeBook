using System;
using System.Collections.Generic;
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
    public class FetchShoppingListIngredientsQuery : IRequest<List<ShoppingListIngredientListItemResponseModel>>
    { }

    public class FetchShoppingListIngredientsQueryHandler : QueryBase<FetchShoppingListIngredientsQuery, List<ShoppingListIngredientListItemResponseModel>>
    {
        public FetchShoppingListIngredientsQueryHandler(RecipeBookReadOnlyDbContext context) : base(context)
        { }

        public override async Task<List<ShoppingListIngredientListItemResponseModel>> Handle(FetchShoppingListIngredientsQuery request, CancellationToken cancellationToken)
        {
            ApplicationUser user = await Context.Users
                .Where(x => x.NormalizedUserName == ApplicationAdminUserConstants.UserMeta.USERNAME.ToUpper())
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user)); // TODO UserNotFoundException!
            }

            return await Context.ShoppingLists
                .Include(x => x.User)
                .Include(x => x.Ingredient)
                .Where(x => x.User == user)
                .Select(x => new ShoppingListIngredientListItemResponseModel
                {
                    Name = x.Ingredient.Name,
                    Amount = x.Amount
                }).ToListAsync(cancellationToken);
        }
    }
}
