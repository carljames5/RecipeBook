using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels;
using Application.Core.CommonModels;
using Application.Core.Constants;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Commands
{
    public class SaveShoppingListIngredientsCommand : IRequest<Result>
    {
        public IEnumerable<ShoppingListIngredientListItemDto> ShoppingListIngredients { get; }

        public SaveShoppingListIngredientsCommand(SaveShoppingListIngredientsRequestModel requestModel)
        {
            ShoppingListIngredients = requestModel.ShoppingListIngredientListItems?.Select(x =>
                new ShoppingListIngredientListItemDto(x.Name, x.Amount));
        }
    }

    public class SaveShoppingLIstIngredientsCommandHandler : CommandBase<SaveShoppingListIngredientsCommand, Result>
    {
        private readonly ISaveShoppingListIngredientsService _saveShoppingListIngredientsService;

        public SaveShoppingLIstIngredientsCommandHandler(RecipeBookDbContext context, ISaveShoppingListIngredientsService saveShoppingListIngredientsService) : base(context)
        {
            _saveShoppingListIngredientsService = saveShoppingListIngredientsService ?? throw new ArgumentNullException(nameof(saveShoppingListIngredientsService));
        }

        protected override async Task<Result> Handler(SaveShoppingListIngredientsCommand request, CancellationToken cancellationToken)
        {
            ApplicationUser user = await Context.Users
                .Include(x => x.ShoppingList)
                .Where(x => x.NormalizedUserName == ApplicationAdminUserConstants.UserMeta.USERNAME.ToUpper())
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user)); // TODO UserNotFoundException!!
            }

            Context.ShoppingList.RemoveRange(user.ShoppingList);

            user.ShoppingList = await _saveShoppingListIngredientsService.InitialNewShoppingListIngredients(
                new InitialNewShoppingListIngredientsDto(request.ShoppingListIngredients, cancellationToken));

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
