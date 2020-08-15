using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Interfaces;
using Application.Core.DTOs.ShoppingList;

namespace Application.BusinessLogicLayer.Engines
{
    public class ShoppingListEngine : IShoppingListEngine
    {
        public ShoppingListEngine()
        {
        }

        public async Task SaveShoppingList(SaveShoppingListIngredientListDto model)
        {
            //ApplicationUser authenticatedUser = _unitOfWork.GetRepository<ApplicationUser>()
            //    .Query()
            //    .FirstOrDefault(x => x.NormalizedUserName == "admin".ToUpper());

            //await RemoveExistingShoppingList(authenticatedUser);

            //ICollection<ShoppingList> newShoppingList =
            //    await InitialNewShoppingListIngredients(model.ShoppingListIngredientListItems, authenticatedUser);

            //await _unitOfWork.GetRepository<ShoppingList>().AddRangeAsync(newShoppingList);
        }

        public List<FetchShoppingListIngredientListItemDto> FetchShoppingList()
        {
            //return _unitOfWork.GetRepository<ShoppingList>()
            //    .Query()
            //    .Include(x => x.User)
            //    .Include(x => x.Ingredient)
            //    .Where(x => x.User.NormalizedUserName == "admin".ToUpper())
            //    .Select(x => new FetchShoppingListIngredientListItemDto
            //    {
            //        Name = x.Ingredient.Name,
            //        Amount = x.Amount
            //    }).ToList();

            return null;
        }

        #region PRIVATE Helper Methods

        //private async Task RemoveExistingShoppingList(ApplicationUser authenticatedUser)
        //{
        //    IEnumerable<ShoppingList> existingShoppingList = _unitOfWork.GetRepository<ShoppingList>()
        //        .Query()
        //        .Where(x => x.UserId == authenticatedUser.Id)
        //        .AsEnumerable();

        //    await _unitOfWork.GetRepository<ShoppingList>().RemoveRangeAsync(existingShoppingList);
        //}

        //private async Task<ICollection<ShoppingList>> InitialNewShoppingListIngredients(List<SaveShoppingListIngredientListItemDto> shoppingListIngredients, ApplicationUser authenticatedUser)
        //{
        //    List<ShoppingList> result = new List<ShoppingList>();
        //    List<Ingredient> existingIngredients = GetExistingIngredients(shoppingListIngredients);

        //    foreach (SaveShoppingListIngredientListItemDto currentIngredient in shoppingListIngredients)
        //    {
        //        Ingredient insertedIngredient =
        //            existingIngredients.FirstOrDefault(x => x.Name.ToLower() == currentIngredient.Name.ToLower());

        //        if (insertedIngredient == null)
        //        {
        //            insertedIngredient = await _unitOfWork.GetRepository<Ingredient>().AddAsync(new Ingredient
        //            {
        //                Name = currentIngredient.Name
        //            });
        //        }

        //        result.Add(new ShoppingList
        //        {
        //            Ingredient = insertedIngredient,
        //            Amount = currentIngredient.Amount
        //        });
        //    }

        //    return result.GroupBy(x => x.Ingredient)
        //        .Select(x => new ShoppingList
        //        {
        //            Ingredient = x.Key,
        //            Amount = x.Select(y => y.Amount).ToArray().Sum(),
        //            User = authenticatedUser,
        //        })
        //        .ToList();
        //}

        //private List<Ingredient> GetExistingIngredients(IEnumerable<SaveShoppingListIngredientListItemDto> shoppingListIngredients)
        //{
        //    IEnumerable<string> insertedIngredientNames = shoppingListIngredients.Select(x => x.Name.ToLower());

        //    return _unitOfWork.GetRepository<Ingredient>()
        //        .Query()
        //        .Where(x => insertedIngredientNames.Contains(x.Name.ToLower()))
        //        .ToList();
        //}

        #endregion
    }
}
