using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core.CommonModels;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.BusinessLogicLayer.Modules.Authentication.Commands
{
    public class SignOutCommand : IRequest<Result>
    { }

    public class SignOutCommandHandler : CommandBase<SignOutCommand, Result>
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public SignOutCommandHandler(RecipeBookDbContext context, SignInManager<ApplicationUser> signInManager) : base(context)
        {
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
        }

        protected override async Task<Result> Handler(SignOutCommand request, CancellationToken cancellationToken)
        {
            await _signInManager.SignOutAsync();

            return Result.Success();
        }
    }
}
