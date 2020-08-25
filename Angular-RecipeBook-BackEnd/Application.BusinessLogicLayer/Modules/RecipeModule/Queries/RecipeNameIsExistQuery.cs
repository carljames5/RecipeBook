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
        public int RecipeId { get; }

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
            Recipe recipe = await Context.Recipes.FirstOrDefaultAsync(x => x.RecipeId != request.RecipeId && x.Name.ToLower() == request.RecipeName, cancellationToken);

            return new RecipeNameIsExistResponseModel
            {
                RecipeNameIsExist = recipe != null
            };
        }
    }
}
