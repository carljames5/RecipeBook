using System.Threading.Tasks;
using Application.BusinessLogicLayer.Interfaces;
using Application.Core.DTOs.Recipe.RequestDtos;

namespace Application.BusinessLogicLayer.Engines
{
    public class RecipeEngine : IRecipeEngine
    {
        public RecipeEngine()
        {
        }

        public async Task AddRecipe(CreateRecipeRequestDto requestModel)
        {
            //Recipe recipe = new Recipe
            //{
            //    Name = requestModel.Name,
            //    Description = requestModel.Description,
            //    ImagePath = requestModel.ImagePath,
            //    RecipeIngredients = await InitialRecipeIngredients(requestModel.RecipeIngredients.Cast<RecipeIngredientBaseDto>().ToList())
            //};

            //await _unitOfWork.GetRepository<Recipe>().AddAsync(recipe);
        }

        public async Task DeleteRecipe(int id)
        {
            //Recipe recipe = _unitOfWork.GetRepository<Recipe>()
            //    .Query()
            //    .Include(x => x.RecipeIngredients)
            //    .FirstOrDefault(x => x.RecipeId == id);

            //if (recipe == null)
            //{
            //    throw new ArgumentNullException(nameof(recipe));
            //}

            //await _unitOfWork.GetRepository<Recipe>().DeleteAsync(recipe);
        }
    }
}
