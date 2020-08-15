using System;
using System.Collections.Generic;
using Application.BusinessLogicLayer.Interfaces;
using Application.Core.DTOs.ShoppingList;
using Application.Web.Models.ShoppingList.RequestModels;
using Application.Web.Models.ShoppingList.ResponseModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IShoppingListEngine _shoppingListEngine;

        public ShoppingListController(IMapper mapper, IShoppingListEngine shoppingListEngine)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _shoppingListEngine = shoppingListEngine ?? throw new ArgumentNullException(nameof(shoppingListEngine));
        }

        [HttpPost("SaveShoppingList")]
        public IActionResult SaveShoppingList([FromBody] SaveShoppingListIngredientListRequestModel requestModel)
        {
            _shoppingListEngine.SaveShoppingList(
                _mapper.Map<SaveShoppingListIngredientListDto>(requestModel));

            return Ok();
        }

        [HttpGet("FetchShoppingList")]
        public ActionResult<FetchShoppingListIngredientListItemResponseModel> FetchShoppingList()
        {
            List<FetchShoppingListIngredientListItemDto> result = _shoppingListEngine.FetchShoppingList();

            return Ok(_mapper.Map<List<FetchShoppingListIngredientListItemResponseModel>>(result));
        }
    }
}
