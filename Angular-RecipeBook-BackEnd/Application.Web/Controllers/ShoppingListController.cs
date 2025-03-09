using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Commands;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Queries;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.RequestModels;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    /// <summary>
    /// Controller for managing shopping lists.
    /// </summary>
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{api-version:apiVersion}/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private readonly IMediator _mediator;

        /// <summary>
        /// Initializes a new instance of the <see cref="ShoppingListController"/> class.
        /// </summary>
        /// <param name="mediator">The mediator instance.</param>
        public ShoppingListController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Gets the last saved shopping list.
        /// </summary>
        /// <returns>The last saved shopping list.</returns>
        [HttpGet(nameof(GetLastSavedShoppingList))]
        public async Task<ActionResult<GetLastSavedShoppingListResponseModel>> GetLastSavedShoppingList()
        {
            var result = await _mediator.Send(new GetLastSavedShoppingListQuery());
            return Ok(result);
        }

        /// <summary>
        /// Saves a shopping list.
        /// </summary>
        /// <param name="requestModel">The request model containing the shopping list data.</param>
        /// <returns>An action result.</returns>
        [HttpPost(nameof(SaveShoppingList))]
        public async Task<ActionResult> SaveShoppingList([FromBody] SaveShoppingListRequestModel requestModel)
        {
            await _mediator.Send(new SaveShoppingListCommand(requestModel));
            return Ok();
        }
    }
}