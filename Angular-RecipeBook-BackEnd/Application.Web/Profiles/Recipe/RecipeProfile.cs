using System.Linq;
using Application.Core.DTOs.Recipe.RequestDtos;
using Application.Web.Models.Recipe.RequestModels;

using AutoMapper;

namespace Application.Web.Profiles.Recipe
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<CreateRecipeRequestModel, CreateRecipeRequestDto>().ForMember(
                destination => destination.RecipeIngredients, opt => opt.MapFrom(
                    source => source.Ingredients.Select(x => new CreateRecipeIngredientRequestDto
                    {
                        Name = x.Name,
                        Amount = x.Amount
                    })));
        }
    }
}
