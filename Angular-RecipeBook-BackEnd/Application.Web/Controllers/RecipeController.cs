﻿using System;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Interfaces;
using Application.BusinessLogicLayer.Modules.RecipeModule.Commands;
using Application.BusinessLogicLayer.Modules.RecipeModule.Queries;
using Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels;
using Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using UpdateRecipeRequestModel = Application.BusinessLogicLayer.Modules.RecipeModule.RequestModels.UpdateRecipeRequestModel;

namespace Application.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeEngine _recipeEngine;

        private readonly IMediator _mediator;

        public RecipeController(IRecipeEngine recipeEngine, IMediator mediator)
        {
            _recipeEngine = recipeEngine ?? throw new ArgumentNullException(nameof(recipeEngine));

            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("GetById")]
        public async Task<ActionResult<GetRecipeByIdResponseModel>> GetRecipeById(GetRecipeByIdRequestModel requestModel)
        {
            GetRecipeByIdResponseModel recipe = await _mediator.Send(new GetRecipeByIdQuery(requestModel));

            return Ok(recipe);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<GetAllRecipeResponseModel>> GetAllRecipe()
        {
            GetAllRecipeResponseModel result = await _mediator.Send(new GetAllRecipeQuery());

            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateRecipe([FromBody] CreateRecipeRequestModel requestModel)
        {
            await _mediator.Send(new CreateRecipeCommand(requestModel));

            return Ok();
        }

        [HttpPost("Edit")]
        public async Task<ActionResult<EditRecipeResponseModel>> EditRecipe(EditRecipeRequestModel requestModel)
        {
            EditRecipeResponseModel result = await _mediator.Send(new EditRecipeQuery(requestModel));

            return Ok(result);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateRecipe([FromBody] UpdateRecipeRequestModel model)
        {
            await _mediator.Send(new UpdateRecipeCommand(model));

            return Ok();
        }

        [HttpDelete("Delete")]
        public IActionResult DeleteRecipe(int id)
        {
            _recipeEngine.DeleteRecipe(id);

            return Ok();
        }

        [HttpPost("RecipeNameIsExist")]
        public async Task<ActionResult<RecipeNameIsExistResponseModel>> RecipeNameIsExist(RecipeNameIsExistRequestModel requestModel)
        {
            RecipeNameIsExistResponseModel response = await _mediator.Send(new RecipeNameIsExistQuery(requestModel));

            return Ok(response);
        }
    }
}