using System.Threading.Tasks;
using Application.Core.DTOs.Recipe.RequestDtos;

namespace Application.BusinessLogicLayer.Interfaces
{
    public interface IRecipeEngine
    {
        Task AddRecipe(CreateRecipeRequestDto requestModel);

        Task DeleteRecipe(int id);
    }
}
