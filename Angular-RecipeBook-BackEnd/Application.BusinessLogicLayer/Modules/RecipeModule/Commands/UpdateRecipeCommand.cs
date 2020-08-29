using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos;
using Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.Core.CommonModels;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Commands
{
    public class UpdateRecipeCommand : IRequest<Result>
    {
        public int Id { get; }

        public string Name { get; }

        public string Description { get; }

        public string ImagePath { get; }

        public List<RecipeIngredientListItemDto> Ingredients { get; }

        public UpdateRecipeCommand(UpdateRecipeRequestModel requestModel)
        {
            Id = requestModel.Id.Value;
            Name = requestModel.Name;
            Description = requestModel.Description;
            ImagePath = requestModel.ImagePath;
            Ingredients = requestModel.Ingredients?.Select(x => new RecipeIngredientListItemDto(x.Name, x.Amount)).ToList();
        }
    }

    public class UpdateRecipeCommandHandler : CommandBase<UpdateRecipeCommand, Result>
    {
        private readonly ICreateAndUpdateRecipeService _createAndUpdateRecipeService;

        public UpdateRecipeCommandHandler(RecipeBookDbContext context, ICreateAndUpdateRecipeService createAndUpdateRecipeService) : base(context)
        {
            _createAndUpdateRecipeService = createAndUpdateRecipeService ?? throw new ArgumentNullException(nameof(createAndUpdateRecipeService));
        }

        protected override async Task<Result> Handler(UpdateRecipeCommand request, CancellationToken cancellationToken)
        {
            Recipe recipe = Context.Recipe
                .Include(x => x.RecipeIngredients)
                .FirstOrDefault(x => x.RecipeId == request.Id);

            if (recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe)); // TODO RecipeNotFoundException
            }

            Context.RecipeIngredient.RemoveRange(recipe.RecipeIngredients);

            recipe.Name = request.Name;
            recipe.Description = request.Description;
            recipe.ImagePath = request.ImagePath;
            recipe.RecipeIngredients = await _createAndUpdateRecipeService.InitialNewRecipeIngredients(new InitialNewRecipeIngredientsDto(request.Ingredients, cancellationToken));

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
