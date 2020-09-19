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
    public class RecipeNameIsExistQuery : IRequest<RecipeNameIsExistResponseModel>
    {
        public int? RecipeId { get; }

        public string RecipeName { get; }

        public RecipeNameIsExistQuery(RecipeNameIsExistRequestModel requestModel)
        {
            RecipeId = requestModel.RecipeId;
            RecipeName = requestModel.RecipeName.Trim().ToLower();
        }
    }

    public class RecipeNameIsExistQueryHandler : QueryBase<RecipeNameIsExistQuery, RecipeNameIsExistResponseModel>
    {
        public RecipeNameIsExistQueryHandler(RecipeBookReadOnlyDbContext context) : base(context)
        { }

        public override async Task<RecipeNameIsExistResponseModel> Handle(RecipeNameIsExistQuery request, CancellationToken cancellationToken)
        {
            RecipeNameIsExistResponseModel responseModel = new RecipeNameIsExistResponseModel();

            if (request.RecipeId.HasValue)
            {
                Recipe existingRecipe = await Context.Recipes.FirstAsync(x => x.RecipeId == request.RecipeId, cancellationToken);

                if (existingRecipe.Name.ToLower() == request.RecipeName)
                {
                    responseModel.RecipeNameIsExist = false;

                    return responseModel;
                }
            }

            responseModel.RecipeNameIsExist = await Context.Recipes.AnyAsync(x => x.Name.ToLower() == request.RecipeName.Trim().ToLower(), cancellationToken);

            return responseModel;
        }
    }
}
