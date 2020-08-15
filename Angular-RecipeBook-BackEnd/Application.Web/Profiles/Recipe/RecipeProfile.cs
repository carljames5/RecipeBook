using System.Linq;
using Application.Core.DTOs.Recipe.RequestDtos;
using Application.Core.DTOs.Recipe.ResponseDtos;
using Application.Web.Models.Recipe.RequestModels;
using Application.Web.Models.Recipe.ResponseModels;
using AutoMapper;

namespace Application.Web.Profiles.Recipe
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
