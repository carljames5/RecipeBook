using System.Threading.Tasks;

namespace Application.BusinessLogicLayer.Interfaces
{
    public interface IRecipeEngine
    {
        Task DeleteRecipe(int id);
    }
}
