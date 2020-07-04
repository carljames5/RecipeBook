using System.Linq;
using Angular_RecipeBook_BackEnd.Models.Recipe.RequestModels;
using Angular_RecipeBook_BackEnd.Models.Recipe.ResponseModels;
using AutoMapper;
using Core.Common.DTOs.Recipe.RequestDtos;
using Core.Common.DTOs.Recipe.ResponseDtos;

namespace Angular_RecipeBook_BackEnd.Profiles.Recipe
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<GetAllRecipeItemResponseDto, GetAllRecipeItemResponseModel>();

            CreateMap<GetRecipeByIdResponseDto, GetRecipeByIdResponseModel>().ForMember(
                destination => destination.Ingredients, opt => opt.MapFrom(
                    source => source.Ingredients.Select(x => new GetRecipeIngredientResponseModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Amount = x.Amount
                    })));

            CreateMap<CreateRecipeRequestModel, CreateRecipeRequestDto>().ForMember(
                destination => destination.RecipeIngredients, opt => opt.MapFrom(
                    source => source.Ingredients.Select(x => new CreateRecipeIngredientRequestDto
                    {
                        Name = x.Name,
                        Amount = x.Amount
                    })));

            CreateMap<UpdateRecipeRequestModel, UpdateRecipeRequestDto>().ForMember(
                destination => destination.RecipeIngredients, opt => opt.MapFrom(
                    source => source.Ingredients.Select(x => new UpdateRecipeIngredientRequestDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Amount = x.Amount
                    })));

            CreateMap<RecipeNameIsExistRequestModel, RecipeNameIsExistRequestDto>();
            CreateMap<RecipeNameIsExistResponseDto, RecipeNameIsExistResponseModel>();
        }
    }
}
