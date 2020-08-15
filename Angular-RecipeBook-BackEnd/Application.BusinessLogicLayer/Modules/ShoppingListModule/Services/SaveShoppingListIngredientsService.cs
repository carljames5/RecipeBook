using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.InitialNewShoppingListIngredients;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.RemoveExistingShoppingList;
using Application.BusinessLogicLayer.Modules.ShoppingListModule.Interfaces;
using Application.DataAccessLayer.Context;
using Application.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Services
{
    public class SaveShoppingListIngredientsService : ISaveShoppingListIngredientsService
    {
        private readonly RecipeBookDbContext _context;

        public SaveShoppingListIngredientsService(RecipeBookDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task RemoveExistingShoppingList(RemoveExistingShoppingListDto model)
        {
            IEnumerable<ShoppingList> existingShoppingList =
                await _context.ShoppingList.Where(x => x.User == model.ApplicationUser).ToListAsync(model.CancellationToken);

            _context.ShoppingList.RemoveRange(existingShoppingList);
        }

        public async Task<IEnumerable<ShoppingList>> InitialNewShoppingListIngredients(InitialNewShoppingListIngredientsDto model)
        {
            List<ShoppingList> result = new List<ShoppingList>();

            List<Ingredient> existingIngredients = await GetExistingIngredientsAsync(model);

            foreach (NewShoppingListIngredientListItemDto newShoppingListIngredient in model.NewShoppingListIngredients)
            {
                Ingredient insertedIngredient =
                    existingIngredients.FirstOrDefault(x => x.Name.Trim().ToLower() == newShoppingListIngredient.Name);

                if (insertedIngredient == null)
                {
                    insertedIngredient = (await _context.Ingredient.AddAsync(new Ingredient
                    {
                        Name = newShoppingListIngredient.Name
                    }, model.CancellationToken)).Entity;
                }

                result.Add(new ShoppingList
                {
                    Ingredient = insertedIngredient,
                    Amount = newShoppingListIngredient.Amount
                });
            }

            return result.GroupBy(x => x.Ingredient)
                         .Select(x => new ShoppingList
                         {
                             Ingredient = x.Key,
                             Amount = x.Select(y => y.Amount).ToArray().Sum(),
                             User = model.ApplicationUser,
                         });
        }

        private async Task<List<Ingredient>> GetExistingIngredientsAsync(InitialNewShoppingListIngredientsDto model)
        {
            IEnumerable<string> insertedIngredientNames = model.NewShoppingListIngredients.Select(x => x.Name.ToLower());

            return await _context.Ingredient
                .Where(x => insertedIngredientNames.Contains(x.Name.ToLower()))
                .ToListAsync(model.CancellationToken);
        }
    }
}
