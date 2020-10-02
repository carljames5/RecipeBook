using System;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.Authentication.Commands;
using Application.BusinessLogicLayer.Modules.Authentication.RequestModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthenticationController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(SignInRequestModel requestModel)
        {
            await _mediator.Send(new SignedInCommand(requestModel));

            return Ok();
        }
    }
}
