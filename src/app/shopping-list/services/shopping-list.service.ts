import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { IngredientsService } from '../../shared/services/ingredients.service';
import { CommonFunctionsService } from '../../shared/services/common-functions.service';

import { ShoppingListIngredient } from '../models/shopping-list-ingredient.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { RecipeIngredient } from 'src/app/recipes/models/recipe-ingredient.model';

@Injectable()
export class ShoppingListService {
  private shoppingListIngredients: ShoppingListIngredient[] = [];

  public shoppingListIngredientsChanged = new Subject<ShoppingListIngredient[]>();
  public shoppingListIngredientEditing = new Subject<number>();

  constructor(private ingredientsService: IngredientsService, private commonFunctionsService: CommonFunctionsService) {
    ingredientsService.getTheFirstTwoItems().map(item => {
      this.shoppingListIngredients.push(
        new ShoppingListIngredient(item.id, item.name, commonFunctionsService.generateRandomAmount(1, 20))
      );
    });
  }

  public getShoppingListIngredients(): ShoppingListIngredient[] {
    return this.shoppingListIngredients.slice();
  }

  public getShoppingListIngredientById(id: number): ShoppingListIngredient {
    return this.shoppingListIngredients.find(x => x.id === id);
  }

  public addIngredientsToShoppingList(ingredients: RecipeIngredient[]): void {
    ingredients.forEach(item => {
      this.addIngredientToShoppingList(new ShoppingListIngredient(item.id, item.name, item.amount));
    });

    this.shoppingListIngredientsChanged.next(this.getShoppingListIngredients());
  }

  public addIngredientToShoppingList(shoppingListIngredient: ShoppingListIngredient): void {
    const shoppingListIngredientIndex = this.getShoppingListIngredientIndexByName(shoppingListIngredient.name);

    if (shoppingListIngredientIndex !== -1) {
      const updatedShoppingListIngredient = this.getShoppingListIngredientByIndex(shoppingListIngredientIndex);
      updatedShoppingListIngredient.amount += shoppingListIngredient.amount;

      this.shoppingListIngredients[shoppingListIngredientIndex] = updatedShoppingListIngredient;
    } else {
      const ingredient = this.ingredientsService.addIngredient(new Ingredient(null, shoppingListIngredient.name));
      shoppingListIngredient.id = ingredient.id;

      this.shoppingListIngredients.push(shoppingListIngredient);
    }

    this.shoppingListIngredientsChanged.next(this.getShoppingListIngredients());
  }

  public updateIngredientInShoppingList(shoppingListIngredient: ShoppingListIngredient): void {
    const updatedIngredientIndex = this.getShoppingListIngredientIndexById(shoppingListIngredient.id);

    if (updatedIngredientIndex !== -1) {
      this.shoppingListIngredients[updatedIngredientIndex] = shoppingListIngredient;

      this.shoppingListIngredientsChanged.next(this.getShoppingListIngredients());
    }
  }

  public deleteIngredientFromShoppingList(id: number): void {
    const deleteIngredientIndex = this.getShoppingListIngredientIndexById(id);

    if (deleteIngredientIndex !== -1) {
      this.shoppingListIngredients.splice(deleteIngredientIndex, 1);

      this.shoppingListIngredientsChanged.next(this.getShoppingListIngredients());
    }
  }

  //#region PRIVATE Helper Methods

  private getShoppingListIngredientIndexByName(name: string): number {
    return this.shoppingListIngredients.findIndex(x => x.name.toLowerCase().trim() === name.toLowerCase().trim());
  }

  private getShoppingListIngredientIndexById(id: number): number {
    return this.shoppingListIngredients.findIndex(x => x.id === id);
  }

  private getShoppingListIngredientByIndex(index: number): ShoppingListIngredient {
    return this.shoppingListIngredients[index];
  }

  //#endregion
}
