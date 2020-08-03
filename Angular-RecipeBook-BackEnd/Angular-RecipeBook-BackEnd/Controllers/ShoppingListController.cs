using System;
using System.Collections.Generic;
using Angular_RecipeBook_BackEnd.Models.ShoppingList.RequestModels;
using Angular_RecipeBook_BackEnd.Models.ShoppingList.ResponseModels;
using AutoMapper;
using Business.Engine.Interfaces;
using Core.Common.DTOs.ShoppingList;
using Microsoft.AspNetCore.Mvc;

namespace Angular_RecipeBook_BackEnd.Controllers
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
        public IActionResult SaveShoppingList([FromBody] SaveShoppingListRequestModel requestModel)
        {
            _shoppingListEngine.SaveShoppingList(
                _mapper.Map<List<SaveShoppingListIngredientItemDto>>(requestModel.ShoppingListIngredients));

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
