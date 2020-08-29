using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.Core.CommonModels;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Commands
{
    public class DeleteRecipeCommand : IRequest<Result>
    {
        public int Id { get; }

        public DeleteRecipeCommand(DeleteRecipeRequestModel requestModel)
        {
            Id = requestModel.Id.Value;
        }
    }

    public class DeleteRecipeCommandHandler : CommandBase<DeleteRecipeCommand, Result>
    {
        public DeleteRecipeCommandHandler(RecipeBookDbContext context) : base(context)
        { }

        protected override async Task<Result> Handler(DeleteRecipeCommand request, CancellationToken cancellationToken)
        {
            Recipe recipe = Context.Recipe.FirstOrDefault(x => x.RecipeId == request.Id);

            if (recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe)); // TODO RecipeNotFoundException
            }

            Context.Recipe.Remove(recipe);

            await Context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
