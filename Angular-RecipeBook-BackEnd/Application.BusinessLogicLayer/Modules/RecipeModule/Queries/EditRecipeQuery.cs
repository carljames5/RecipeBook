using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Queries
{
    public class EditRecipeQuery : IRequest<EditRecipeResponseModel>
    {
        public int Id { get; }

        public EditRecipeQuery(EditRecipeRequestModel requestModel)
        {
            Id = requestModel.Id.Value;
        }
    }

    public class EditRecipeQueryHandler : QueryBase<EditRecipeQuery, EditRecipeResponseModel>
    {
        public EditRecipeQueryHandler(RecipeBookReadOnlyDbContext context) : base(context)
        { }

        public override async Task<EditRecipeResponseModel> Handle(EditRecipeQuery request, CancellationToken cancellationToken)
        {
            Recipe recipe = await Context.Recipes
                .Include(x => x.RecipeIngredients)
                .ThenInclude(x => x.Ingredient)
                .FirstOrDefaultAsync(x => x.RecipeId == request.Id, cancellationToken);

            if (recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe)); // TODO RecipeNotFoundException
            }

            return new EditRecipeResponseModel
            {
                Id = recipe.RecipeId,
                Name = recipe.Name,
                Description = recipe.Description,
                ImagePath = recipe.ImagePath,
                Ingredients = recipe.RecipeIngredients
                    .Where(x => x.RecipeId == recipe.RecipeId)
                    .Select(x => new EditRecipeIngredientListItemResponseModel
                    {
                        Name = x.Ingredient.Name,
                        Amount = x.Amount
                    }).ToList()
            };
        }
    }
}
