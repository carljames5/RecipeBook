using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core.DTOs.Recipe.RequestDtos;
using Application.Core.DTOs.Recipe.ResponseDtos;

namespace Application.BusinessLogicLayer.Interfaces
{
    public interface IRecipeEngine
    {
        Task<List<GetAllRecipeItemResponseDto>> GetAllRecipe();

        GetRecipeByIdResponseDto GetRecipeById(int id);

        Task AddRecipe(CreateRecipeRequestDto requestModel);

        Task UpdateRecipe(UpdateRecipeRequestDto requestModel);

        Task DeleteRecipe(int id);

        Task<RecipeNameIsExistResponseDto> RecipeNameIsExist(RecipeNameIsExistRequestDto requestModel);
    }
}
