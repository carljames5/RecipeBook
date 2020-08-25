using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces
{
    public interface IAddAndUpdateRecipeService
    {
        Task<ICollection<RecipeIngredient>> InitialNewRecipeIngredients(InitialNewRecipeIngredientsDto modelDto);
    }
}
