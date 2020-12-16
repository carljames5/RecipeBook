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

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Commands
{
    public class CreateRecipeCommand : IRequest<Result>
    {
        public string Name { get; }

        public string Description { get; }

        public string ImagePath { get; }

        public List<RecipeIngredientListItemDto> Ingredients { get; }

        public CreateRecipeCommand(CreateRecipeRequestModel requestModel)
        {
            Name = requestModel.Name;
            Description = requestModel.Description;
            ImagePath = requestModel.ImagePath;
            Ingredients = requestModel.Ingredients?.Select(x => new RecipeIngredientListItemDto(x.Name, x.Amount)).ToList();
        }
    }

    public class CreateRecipeCommandHandler : CommandBase<CreateRecipeCommand, Result>
    {
        private readonly IRecipeValidatorService _recipeValidatorService;

        private readonly IRecipeIngredientService _recipeIngredientService;

        public CreateRecipeCommandHandler(RecipeBookDbContext context, IRecipeValidatorService recipeValidatorService, IRecipeIngredientService recipeIngredientService) : base(context)
        {
            _recipeValidatorService = recipeValidatorService;
            _recipeIngredientService = recipeIngredientService;
        }

        protected override async Task<Result> Handler(CreateRecipeCommand request, CancellationToken cancellationToken)
        {
            if (await _recipeValidatorService.RecipeNameIsExist(new RecipeNameIsExistDto(null, request.Name, cancellationToken)))
            {
                throw new RecipeBookException(RecipeBookExceptionCode.RecipeNameIsAlreadyExist, $"Recipe name is exist! {nameof(request.Name)}: {request.Name}");
            }

            Recipe recipe = new Recipe
            {
                Name = request.Name,
                Description = request.Description,
                ImagePath = request.ImagePath,
                RecipeIngredients =
                await _recipeIngredientService.InitialNewRecipeIngredients(new InitialNewRecipeIngredientsDto(request.Ingredients, cancellationToken))
            };

            await Context.Recipe.AddAsync(recipe, cancellationToken);

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
