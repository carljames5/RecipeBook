using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels;
using Application.Core.CommonModels;
using Application.Core.Exceptions;
using Application.Core.Interfaces.Services;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Commands
{
    public class SaveShoppingListCommand : IRequest<Result>
    {
        public IEnumerable<ShoppingListIngredientListItemDto> Ingredients { get; }

        public SaveShoppingListCommand(SaveShoppingListRequestModel requestModel)
        {
            Ingredients = requestModel.Ingredients?.Select(x =>
                new ShoppingListIngredientListItemDto(x.Name, x.Amount));
        }
    }

    public class SaveShoppingListCommandHandler : CommandBase<SaveShoppingListCommand, Result>
    {
        private readonly ISaveShoppingListService _saveShoppingListService;

        private readonly int _authorizedUserId;

        public SaveShoppingListCommandHandler(RecipeBookDbContext context, ICurrentUserService currentUserService, ISaveShoppingListService saveShoppingListService) : base(context)
        {
            _saveShoppingListService = saveShoppingListService ?? throw new ArgumentNullException(nameof(saveShoppingListService));

            _authorizedUserId = currentUserService?.GetAuthorizedUserId() ?? throw new ArgumentNullException(nameof(currentUserService));
        }

        protected override async Task<Result> Handler(SaveShoppingListCommand request, CancellationToken cancellationToken)
        {
            ApplicationUser user = await Context.Users
                .Include(x => x.ShoppingList)
                .Where(x => x.Id == _authorizedUserId)
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                throw new RecipeBookException(RecipeBookExceptionCode.UserNotFound, $"User not found in database! {nameof(user.Id)}: {_authorizedUserId}");
            }

            Context.ShoppingList.RemoveRange(user.ShoppingList);

            user.ShoppingList = await _saveShoppingListService.InitialNewShoppingListIngredients(
                new InitialNewShoppingListIngredientsDto(request.Ingredients, cancellationToken));

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
