using Angular_RecipeBook_BackEnd.Models.ShoppingList.RequestModels;
using AutoMapper;
using Core.Common.DTOs.ShoppingList;

namespace Angular_RecipeBook_BackEnd.Profiles.Recipe
{
    public class ShoppingListProfile : Profile
    {
        public ShoppingListProfile()
        {
            CreateMap<SaveShoppingListIngredientRequestModel, SaveShoppingListIngredienttemDto>();
        }
    }
}
