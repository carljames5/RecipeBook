using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos.Services.RecipeValidatorService;
using Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.Core.CommonModels;
using Application.Core.Exceptions;
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
            Id = requestModel.Id;
            Name = requestModel.Name;
            Description = requestModel.Description;
            ImagePath = requestModel.ImagePath;
            Ingredients = requestModel.Ingredients?.Select(x => new RecipeIngredientListItemDto(x.Name, x.Amount)).ToList();
        }
    }

    public class UpdateRecipeCommandHandler : CommandBase<UpdateRecipeCommand, Result>
    {
        private readonly IRecipeIngredientService _recipeIngredientService;

        private readonly IRecipeValidatorService _recipeValidatorService;

        public UpdateRecipeCommandHandler(RecipeBookDbContext context, IRecipeIngredientService recipeIngredientService, IRecipeValidatorService recipeValidatorService) : base(context)
        {
            _recipeIngredientService = recipeIngredientService ?? throw new ArgumentNullException(nameof(recipeIngredientService));
            _recipeValidatorService = recipeValidatorService ?? throw new ArgumentNullException(nameof(recipeValidatorService));
        }

        protected override async Task<Result> Handler(UpdateRecipeCommand request, CancellationToken cancellationToken)
        {
            Recipe recipe = Context.Recipe
                .Include(x => x.RecipeIngredients)
                .FirstOrDefault(x => x.RecipeId == request.Id);

            if (recipe == null)
            {
                throw new RecipeBookException(RecipeBookExceptionCode.UpgradeableRecipeNotFound,
                    $"Upgradeable recipe not found in database! {nameof(recipe.RecipeId)}: {request.Id}");
            }

            if (await _recipeValidatorService.RecipeNameIsExist(new RecipeNameIsExistDto(request.Id, request.Name, cancellationToken)))
            {
                throw new RecipeBookException(RecipeBookExceptionCode.RecipeNameIsAlreadyExist, $"Recipe name is exist! {nameof(request.Name)}: {request.Name}");
            }

            Context.RecipeIngredient.RemoveRange(recipe.RecipeIngredients);

            recipe.Name = request.Name;
            recipe.Description = request.Description;
            recipe.ImagePath = request.ImagePath;
            recipe.RecipeIngredients = await _recipeIngredientService.InitialNewRecipeIngredients(new InitialNewRecipeIngredientsDto(request.Ingredients, cancellationToken));

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
