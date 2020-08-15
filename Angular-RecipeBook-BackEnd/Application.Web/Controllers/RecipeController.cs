using System;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Interfaces;
using Application.BusinessLogicLayer.Modules.RecipeModule.Queries;
using Application.BusinessLogicLayer.Modules.RecipeModule.ResponseModels;
using Application.Core.DTOs.Recipe.RequestDtos;
using Application.Core.DTOs.Recipe.ResponseDtos;
using Application.Web.Models.Recipe.RequestModels;
using Application.Web.Models.Recipe.ResponseModels;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IRecipeEngine _recipeEngine;

        private readonly IMediator _mediator;

        public RecipeController(IRecipeEngine recipeEngine, IMapper mapper, IMediator mediator)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _recipeEngine = recipeEngine ?? throw new ArgumentNullException(nameof(recipeEngine));

            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("GetById")]
        public ActionResult<GetRecipeByIdResponseModel> GetRecipeById(int id)
        {
            GetRecipeByIdResponseModel recipe = _mapper.Map<GetRecipeByIdResponseDto, GetRecipeByIdResponseModel>(_recipeEngine.GetRecipeById(id));

            return Ok(recipe);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<GetAllRecipeResponseModel>> GetAllRecipe()
        {
            GetAllRecipeResponseModel result = await _mediator.Send(new GetAllRecipeQuery());

            return Ok(result);
        }

        [HttpPost("Create")]
        public IActionResult CreateRecipe([FromBody] CreateRecipeRequestModel model)
        {
            _recipeEngine.AddRecipe(_mapper.Map<CreateRecipeRequestModel, CreateRecipeRequestDto>(model));

            return Ok();
        }

        [HttpPut("Update")]
        public IActionResult UpdateRecipe([FromBody] UpdateRecipeRequestModel model)
        {
            _recipeEngine.UpdateRecipe(_mapper.Map<UpdateRecipeRequestModel, UpdateRecipeRequestDto>(model));

            return Ok();
        }

        [HttpDelete("Delete")]
        public IActionResult DeleteRecipe(int id)
        {
            _recipeEngine.DeleteRecipe(id);

            return Ok();
        }

        [HttpPost("RecipeNameIsExist")]
        public async Task<ActionResult<RecipeNameIsExistResponseModel>> RecipeNameIsExist(RecipeNameIsExistRequestModel model)
        {
            RecipeNameIsExistResponseDto result = await _recipeEngine.RecipeNameIsExist(
                _mapper.Map<RecipeNameIsExistRequestModel, RecipeNameIsExistRequestDto>(model));

            return Ok(_mapper.Map<RecipeNameIsExistResponseDto, RecipeNameIsExistResponseModel>(result));
        }
    }
}