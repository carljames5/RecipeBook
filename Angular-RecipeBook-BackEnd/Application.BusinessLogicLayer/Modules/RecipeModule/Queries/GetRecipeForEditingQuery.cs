using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels;
using Application.Core.Exceptions;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Queries
{
    public class GetRecipeForEditingQuery : IRequest<GetRecipeForEditingResponseModel>
    {
        public int Id { get; }

        public GetRecipeForEditingQuery(GetRecipeForEditingRequestModel requestModel)
        {
            Id = requestModel.Id;
        }
    }

    public class GetRecipeForEditingQueryHandler : QueryBase<GetRecipeForEditingQuery, GetRecipeForEditingResponseModel>
    {
        public GetRecipeForEditingQueryHandler(RecipeBookReadOnlyDbContext context) : base(context)
        { }

        public override async Task<GetRecipeForEditingResponseModel> Handle(GetRecipeForEditingQuery request, CancellationToken cancellationToken)
        {
            Recipe recipe = await Context.Recipes
                .Include(x => x.RecipeIngredients)
                .ThenInclude(x => x.Ingredient)
                .FirstOrDefaultAsync(x => x.RecipeId == request.Id, cancellationToken);

            if (recipe == null)
            {
                throw new RecipeBookException(RecipeBookExceptionCode.RecipeNotFound,
                    $"This recipe not found in database! {nameof(recipe.RecipeId)}: {request.Id}");
            }

            return new GetRecipeForEditingResponseModel
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
