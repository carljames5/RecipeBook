namespace Application.BusinessLogicLayer.Modules.RecipeModule.Dtos
{
    public class RecipeIngredientListItemDto
    {
        public string Name { get; }

        public int Amount { get; }

        public RecipeIngredientListItemDto(string name, int amount)
        {
            Name = name.Trim();
            Amount = amount;
        }
    }
}
