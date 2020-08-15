using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Angular_RecipeBook_BackEnd.Models.Recipe.RequestModels;
using Angular_RecipeBook_BackEnd.Models.Recipe.ResponseModels;
using Application.BusinessLogicLayer.Interfaces;
using AutoMapper;
using Core.Common.DTOs.Recipe.RequestDtos;
using Core.Common.DTOs.Recipe.ResponseDtos;
using Microsoft.AspNetCore.Mvc;

namespace Angular_RecipeBook_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IRecipeEngine _recipeEngine;

        public RecipeController(IRecipeEngine recipeEngine, IMapper mapper)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _recipeEngine = recipeEngine ?? throw new ArgumentNullException(nameof(recipeEngine));
        }

        [HttpGet("GetById")]
        public ActionResult<GetRecipeByIdResponseModel> GetRecipeById(int id)
        {
            GetRecipeByIdResponseModel recipe = _mapper.Map<GetRecipeByIdResponseDto, GetRecipeByIdResponseModel>(_recipeEngine.GetRecipeById(id));

            return Ok(recipe);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<GetAllRecipeItemResponseModel>>> GetAllRecipe()
        {
            List<GetAllRecipeItemResponseModel> recipes = _mapper.Map<List<GetAllRecipeItemResponseModel>>(await _recipeEngine.GetAllRecipe());

            return Ok(recipes);
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