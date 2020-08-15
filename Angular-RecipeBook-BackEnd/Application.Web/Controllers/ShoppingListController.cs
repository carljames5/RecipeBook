using System;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Commands;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Queries;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ShoppingListController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("SaveShoppingList")]
        public async Task<ActionResult> SaveShoppingList([FromBody] SaveShoppingListIngredientsRequestModel requestModel)
        {
            await _mediator.Send(new SaveShoppingListIngredientsCommand(requestModel));

            return Ok();
        }

        [HttpGet("FetchShoppingList")]
        public async Task<ActionResult<FetchShoppingListIngredientsResponseModel>> FetchShoppingList()
        {
            FetchShoppingListIngredientsResponseModel result =
                await _mediator.Send(new FetchShoppingListIngredientsQuery());

            return Ok(result);
        }
    }
}
