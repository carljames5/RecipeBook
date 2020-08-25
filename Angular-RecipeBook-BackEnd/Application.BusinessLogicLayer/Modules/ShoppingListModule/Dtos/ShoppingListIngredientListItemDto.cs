namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos
{
    public class ShoppingListIngredientListItemDto
    {
        public string Name { get; }

        public int Amount { get; }

        public ShoppingListIngredientListItemDto(string name, int amount)
        {
            Name = name.Trim();
            Amount = amount;
        }
    }
}
