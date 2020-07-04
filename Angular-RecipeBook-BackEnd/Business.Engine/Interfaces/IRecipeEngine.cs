using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.DTOs.Recipe.RequestDtos;
using Core.Common.DTOs.Recipe.ResponseDtos;

namespace Business.Engine.Interfaces
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
