using System;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.AuthorizedUser.Queries;
using Application.BusinessLogicLayer.Modules.AuthorizedUser.ResponseModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizedUserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthorizedUserController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [Authorize]
        [HttpGet("UserIsSignedIn")]
        public ActionResult UserIsSignedIn()
        {
            return Ok();
        }

        [Authorize]
        [HttpGet("GetAuthorizedUserData")]
        public async Task<ActionResult<AuthorizedUserDataResponseModel>> GetAuthorizedUserData()
        {
            AuthorizedUserDataResponseModel result = await _mediator.Send(new GetAuthorizedUserDataQuery());

            return Ok(result);
        }
    }
}
