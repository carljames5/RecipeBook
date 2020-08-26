using System.Threading.Tasks;
using Application.BusinessLogicLayer.Interfaces;

namespace Application.BusinessLogicLayer.Engines
{
    public class RecipeEngine : IRecipeEngine
    {
        public RecipeEngine()
        {
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
