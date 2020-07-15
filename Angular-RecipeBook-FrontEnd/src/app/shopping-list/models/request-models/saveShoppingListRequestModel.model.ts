import { SaveShoppingListIngredientRequestModel } from './saveShoppingListIngredientRequestModel.model';

export class SaveShoppingListRequestModel {
  public shoppingListIngredients: SaveShoppingListIngredientRequestModel[];

  constructor(shoppingListIngredients: SaveShoppingListIngredientRequestModel[]) {
    this.shoppingListIngredients = shoppingListIngredients;
  }
}
