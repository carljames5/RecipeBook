using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Interfaces;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Queries;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.ResponseModels;
using Application.Core.DTOs.ShoppingList;
using Application.Web.Models.ShoppingList.RequestModels;
using Application.Web.Models.ShoppingList.ResponseModels;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IShoppingListEngine _shoppingListEngine;

        private readonly IMediator _mediator;

        public ShoppingListController(IMapper mapper, IShoppingListEngine shoppingListEngine, IMediator mediator)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _shoppingListEngine = shoppingListEngine ?? throw new ArgumentNullException(nameof(shoppingListEngine));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("SaveShoppingList")]
        public IActionResult SaveShoppingList([FromBody] SaveShoppingListIngredientListRequestModel requestModel)
        {
            _shoppingListEngine.SaveShoppingList(
                _mapper.Map<SaveShoppingListIngredientListDto>(requestModel));

            return Ok();
        }

        [HttpGet("FetchShoppingList")]
        public async Task<ActionResult<FetchShoppingListIngredientListItemResponseModel>> FetchShoppingList()
        {
            List<ShoppingListIngredientListItemResponseModel> result =
                await _mediator.Send(new FetchShoppingListIngredientsQuery());

            return Ok(result);
        }
    }
}
