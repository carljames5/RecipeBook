using Application.Core.DTOs.ShoppingList;
using Application.Web.Models.ShoppingList.RequestModels;
using Application.Web.Models.ShoppingList.ResponseModels;
using AutoMapper;

namespace Application.Web.Profiles.Recipe
{
    public class ShoppingListProfile : Profile
    {
        public ShoppingListProfile()
        {
            CreateMap<SaveShoppingListIngredientListRequestModel, SaveShoppingListIngredientListDto>();

            CreateMap<SaveShoppingListIngredientListItemRequestModel, SaveShoppingListIngredientListItemDto>();

            CreateMap<FetchShoppingListIngredientListItemDto, FetchShoppingListIngredientListItemResponseModel>();
        }
    }
}
