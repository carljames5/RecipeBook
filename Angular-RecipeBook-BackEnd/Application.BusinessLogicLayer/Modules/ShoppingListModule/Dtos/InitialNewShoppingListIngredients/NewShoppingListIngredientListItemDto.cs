namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.InitialNewShoppingListIngredients
{
    public class NewShoppingListIngredientListItemDto
    {
        public string Name { get; }

        public int Amount { get; }

        public NewShoppingListIngredientListItemDto(string name, int amount)
        {
            Name = name.Trim().ToLower();
            Amount = amount;
        }
    }
}
