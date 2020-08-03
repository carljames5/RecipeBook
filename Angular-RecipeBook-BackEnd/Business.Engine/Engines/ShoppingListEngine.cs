using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Engine.Interfaces;
using Core.ApplicationCore.UnitOfWork;
using Core.Common.DTOs.ShoppingList;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Business.Engine.Engines
{
    public class ShoppingListEngine : IShoppingListEngine
    {
        private readonly IUnitOfWork<RecipeBookContext> _unitOfWork;

        public ShoppingListEngine(IUnitOfWork<RecipeBookContext> unitOfWork)
        {
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task SaveShoppingList(List<SaveShoppingListIngredientItemDto> saveShoppingListIngredients)
        {
            RecipeBookAppUser authenticatedUser = _unitOfWork.GetRepository<RecipeBookAppUser>().Query()
                .FirstOrDefault(x => x.NormalizedUserName == "admin".ToUpper());

            await RemoveExistingShoppingList(authenticatedUser);

            ICollection<ShoppingList> newShoppingList =
                await InitialShoppingListIngredients(saveShoppingListIngredients, authenticatedUser);

            await _unitOfWork.GetRepository<ShoppingList>().AddRangeAsync(newShoppingList);
        }

        public List<FetchShoppingListIngredientListItemDto> FetchShoppingList()
        {
            return _unitOfWork.GetRepository<ShoppingList>()
                .Query()
                .Include(x => x.User)
                .Include(x => x.Ingredient)
                .Where(x => x.User.NormalizedUserName == "admin".ToUpper())
                .Select(x => new FetchShoppingListIngredientListItemDto
                {
                    Name = x.Ingredient.Name,
                    Amount = x.Amount
                }).ToList();
        }

        #region PRIVATE Helper Methods

        private async Task RemoveExistingShoppingList(RecipeBookAppUser authenticatedUser)
        {
            List<ShoppingList> existingShoppingList = _unitOfWork.GetRepository<ShoppingList>()
                .Query()
                .Where(x => x.UserId == authenticatedUser.Id)
                .ToList();

            await _unitOfWork.GetRepository<ShoppingList>().RemoveRangeAsync(existingShoppingList);
        }

        private async Task<ICollection<ShoppingList>> InitialShoppingListIngredients(List<SaveShoppingListIngredientItemDto> shoppingListIngredients, RecipeBookAppUser authenticatedUser)
        {
            List<ShoppingList> result = new List<ShoppingList>();

            List<Ingredient> existingIngredients = GetExistingIngredients(shoppingListIngredients);

            foreach (SaveShoppingListIngredientItemDto currentIngredient in shoppingListIngredients)
            {
                Ingredient insertedIngredient =
                    existingIngredients.FirstOrDefault(x => x.Name.ToLower() == currentIngredient.Name.ToLower());

                if (insertedIngredient == null)
                {
                    insertedIngredient = await _unitOfWork.GetRepository<Ingredient>().AddAsync(new Ingredient
                    {
                        Name = currentIngredient.Name
                    });
                }

                result.Add(new ShoppingList
                {
                    Ingredient = insertedIngredient,
                    Amount = currentIngredient.Amount
                });
            }

            return result.GroupBy(x => x.Ingredient)
                .Select(x => new ShoppingList
                {
                    Ingredient = x.Key,
                    Amount = x.Select(y => y.Amount).ToArray().Sum(),
                    User = authenticatedUser,
                })
                .ToList();
        }

        private List<Ingredient> GetExistingIngredients(IEnumerable<SaveShoppingListIngredientItemDto> shoppingLIstIngredients)
        {
            IEnumerable<string> insertedIngredientNames = shoppingLIstIngredients.Select(x => x.Name.ToLower());

            return _unitOfWork.GetRepository<Ingredient>()
                .Filter(x => insertedIngredientNames.Contains(x.Name.ToLower()))
                .ToList();
        }

        #endregion
    }
}
