using System;
using System.Threading;
using System.Threading.Tasks;
using Application.DataAccessLayer.Context;
using MediatR;

namespace Application.BusinessLogicLayer
{
    public abstract class CommandBase<TCommand, TResult> : IRequestHandler<TCommand, TResult> where TCommand : IRequest<TResult>
    {
        protected readonly RecipeBookDbContext Context;

        protected CommandBase(RecipeBookDbContext context)
        {
            Context = context;
        }

        public Task<TResult> Handle(TCommand command, CancellationToken cancellationToken)
        {
            if (command == null)
            {
                throw new ArgumentNullException(nameof(command));
            }

            return Handler(command, cancellationToken);
        }

        protected abstract Task<TResult> Handler(TCommand request, CancellationToken cancellationToken);
    }
}
