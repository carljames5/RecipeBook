using System.Collections.Generic;
using System.Threading.Tasks;
using Business.Engine.Interfaces;
using Core.Common.DTOs.Recipe;
using Core.Common.DTOs.Recipe.RequestDtos;
using Core.Common.DTOs.Recipe.ResponseDtos;
using Data.DataAccessLayer.Entities;

namespace Business.Engine.Engines
{
    public class RecipeEngine : IRecipeEngine
    {
        public RecipeEngine()
        {
        }

        public GetRecipeByIdResponseDto GetRecipeById(int id)
        {
            //Recipe recipe = _unitOfWork
            //    .GetRepository<Recipe>()
            //    .Query()
            //    .Include(x => x.RecipeIngredients)
            //    .Include("RecipeIngredients.Ingredient")
            //    .FirstOrDefault(x => x.RecipeId == id);

            //if (recipe == null)
            //{
            //    throw new ArgumentNullException(nameof(recipe));
            //}

            //return new GetRecipeByIdResponseDto
            //{
            //    Id = recipe.RecipeId,
            //    Name = recipe.Name,
            //    Description = recipe.Description,
            //    ImagePath = recipe.ImagePath,
            //    Ingredients = recipe.RecipeIngredients.Select(x => new GetRecipeByIdIngredientResponseDto
            //    {
            //        Id = x.Ingredient.Id,
            //        Amount = x.Amount,
            //        Name = x.Ingredient.Name
            //    }).ToList()
            //};

            return null;
        }

        public async Task<List<GetAllRecipeItemResponseDto>> GetAllRecipe()
        {
            //ICollection<Recipe> recipes = await _unitOfWork.GetRepository<Recipe>().GetAllAsync();

            //return recipes.Select(x => new GetAllRecipeItemResponseDto
            //{
            //    Id = x.RecipeId,
            //    Name = x.Name,
            //    Description = x.Description,
            //    ImagePath = x.ImagePath
            //}).ToList();

            return null;
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

        public async Task UpdateRecipe(UpdateRecipeRequestDto requestModel)
        {
            //Recipe recipe = _unitOfWork.GetRepository<Recipe>()
            //    .Query()
            //    .Include(x => x.RecipeIngredients)
            //    .FirstOrDefault(x => x.RecipeId == requestModel.Id);

            //if (recipe == null)
            //{
            //    throw new ArgumentNullException(nameof(recipe));
            //}

            //recipe.Name = requestModel.Name;
            //recipe.Description = requestModel.Description;
            //recipe.ImagePath = requestModel.ImagePath;
            //recipe.RecipeIngredients =
            //    await InitialRecipeIngredients(requestModel.RecipeIngredients.Cast<RecipeIngredientBaseDto>().ToList());

            //await _unitOfWork.GetRepository<Recipe>().UpdateAsync(recipe);
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

        public async Task<RecipeNameIsExistResponseDto> RecipeNameIsExist(RecipeNameIsExistRequestDto requestModel)
        {
            //Recipe existingRecipe = await _unitOfWork.GetRepository<Recipe>().FindAsync(x => x.RecipeId != requestModel.RecipeId && x.Name.ToLower() == requestModel.RecipeName.ToLower());

            //return new RecipeNameIsExistResponseDto
            //{
            //    RecipeNameIsExist = existingRecipe != null
            //};

            return null;
        }

        #region PRIVATE Helper Methods

        private async Task<ICollection<RecipeIngredient>> InitialRecipeIngredients(List<RecipeIngredientBaseDto> recipeIngredients)
        {
            //List<RecipeIngredient> result = new List<RecipeIngredient>();

            //List<Ingredient> existingIngredients = GetExistingIngredients(recipeIngredients);

            //foreach (RecipeIngredientBaseDto currentIngredient in recipeIngredients)
            //{
            //    Ingredient insertedIngredient =
            //        existingIngredients.FirstOrDefault(x => x.Name.ToLower() == currentIngredient.Name.ToLower());

            //    if (insertedIngredient == null)
            //    {
            //        insertedIngredient = await _unitOfWork.GetRepository<Ingredient>().AddAsync(new Ingredient
            //        {
            //            Name = currentIngredient.Name
            //        });
            //    }

            //    result.Add(new RecipeIngredient
            //    {
            //        Ingredient = insertedIngredient,
            //        Amount = currentIngredient.Amount
            //    });
            //}

            //return result.GroupBy(x => x.Ingredient)
            //             .Select(x => new RecipeIngredient
            //             {
            //                 Ingredient = x.Key,
            //                 Amount = x.Select(y => y.Amount).ToArray().Sum()
            //             })
            //             .ToList();

            return null;
        }

        private List<Ingredient> GetExistingIngredients(IEnumerable<RecipeIngredientBaseDto> recipeIngredients)
        {
            //IEnumerable<string> insertedIngredientNames = recipeIngredients.Select(x => x.Name.ToLower());

            //return _unitOfWork.GetRepository<Ingredient>()
            //    .Filter(x => insertedIngredientNames.Contains(x.Name.ToLower())).ToList();

            return null;
        }

        #endregion
    }
}
