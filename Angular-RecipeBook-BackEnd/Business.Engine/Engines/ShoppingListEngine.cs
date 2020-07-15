using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Engine.Interfaces;
using Core.ApplicationCore.UnitOfWork;
using Core.Common.DTOs.ShoppingList;
using Data.DataAccessLayer.Context;
using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;

namespace Business.Engine.Engines
{
    public class ShoppingListEngine : IShoppingListEngine
    {
        private readonly UserManager<RecipeBookAppUser> _userManager;

        private readonly SignInManager<RecipeBookAppUser> _signInManager;

        private readonly IUnitOfWork<RecipeBookContext> _unitOfWork;

        public ShoppingListEngine(UserManager<RecipeBookAppUser> userManager, SignInManager<RecipeBookAppUser> signInManager, IUnitOfWork<RecipeBookContext> unitOfWork)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _signInManager = signInManager;
        }

        public async Task SaveShoppingList(List<SaveShoppingListIngredienttemDto> saveShoppingListIngredients)
        {
            RecipeBookAppUser authenticatedUser = await _userManager.FindByNameAsync("admin");

            RecipeBookAppUser asd = _unitOfWork.GetRepository<RecipeBookAppUser>().Query()
                .FirstOrDefault(x => x.UserName == "admin");

            var result = await _signInManager.PasswordSignInAsync("admin", "techadmin2020", false, false);

            await RemoveExistingShoppingList(authenticatedUser);

            ICollection<ShoppingList> newShoppingList =
                await InitialShoppingListIngredients(saveShoppingListIngredients, authenticatedUser);

            await _unitOfWork.GetRepository<ShoppingList>().AddRangeAsync(newShoppingList);
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

        private async Task<ICollection<ShoppingList>> InitialShoppingListIngredients(List<SaveShoppingListIngredienttemDto> shoppingListIngredients, RecipeBookAppUser authenticatedUser)
        {
            List<ShoppingList> result = new List<ShoppingList>();

            List<Ingredient> existingIngredients = GetExistingIngredients(shoppingListIngredients);

            foreach (SaveShoppingListIngredienttemDto currentIngredient in shoppingListIngredients)
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

        private List<Ingredient> GetExistingIngredients(IEnumerable<SaveShoppingListIngredienttemDto> shoppingLIstIngredients)
        {
            IEnumerable<string> insertedIngredientNames = shoppingLIstIngredients.Select(x => x.Name.ToLower());

            return _unitOfWork.GetRepository<Ingredient>()
                .Filter(x => insertedIngredientNames.Contains(x.Name.ToLower()))
                .ToList();
        }

        #endregion
    }
}
