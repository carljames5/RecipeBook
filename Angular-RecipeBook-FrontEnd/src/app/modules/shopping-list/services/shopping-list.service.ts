import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ShoppingListHttpService } from './shopping-list-http.service';

import { ShoppingListModel } from '../models/shopping-list.model';
import { ShoppingListIngredientModel } from '../models/shopping-list-ingredient.model';
import { EditShoppingListIngredientModel } from '../models/edit-shopping-list-ingredient.model';
import { SaveShoppingListRequestModel } from '../models/request-models/save-shopping-list-request.model';
import { GetLastSavedShoppingListResponseModel } from '../models/response-models/get-last-saved-shopping-list-response.model.ts';
import { GetRecipeByIdIngredientListItemResponseModel } from '../../recipe/models/response-models/get-recipe-by-id-ingredient-list-item-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: ShoppingListModel;

  public shoppingListSavedSubject = new Subject();
  public refreshShoppingListIngredientsSubject = new Subject<ShoppingListIngredientModel[]>();
  public shoppingListIngredientWasLoadedForEditingSubject = new Subject<EditShoppingListIngredientModel>();

  constructor(private shoppingListHttpService: ShoppingListHttpService) {
    this.shoppingList = { ingredients: [] } as ShoppingListModel;
  }

  public getLastSavedShoppingList() {
    this.shoppingListHttpService.getLastSavedShoppingList().subscribe(
      (response: GetLastSavedShoppingListResponseModel) => {
        this.shoppingList.ingredients = response.ingredients;

        this.refreshShoppingListIngredientsSubject.next(this.shoppingList.ingredients);
      },
      err => {
        console.log(err);
      }
    );
  }

  public getShoppingListIngredients(): ShoppingListIngredientModel[] {
    return this.shoppingList.ingredients;
  }

  public getShoppingListIngredientForEdit(ingredientArrayIndex: number): EditShoppingListIngredientModel {
    const shoppingListIngredientForEdit: ShoppingListIngredientModel = this.shoppingList.ingredients[
      ingredientArrayIndex
    ];

    return {
      arrayIndex: ingredientArrayIndex,
      amount: shoppingListIngredientForEdit.amount,
      name: shoppingListIngredientForEdit.name,
    } as EditShoppingListIngredientModel;
  }

  public addShoppingListIngredientToShoppingList(shoppingListIngredient: ShoppingListIngredientModel): void {
    this.addNewShoppingListIngredientToShoppingList(shoppingListIngredient);

    this.refreshShoppingListIngredientsSubject.next(this.shoppingList.ingredients);
  }

  public updateShoppingListIngredientInShoppingList(editedElement: EditShoppingListIngredientModel): void {
    const existingIngredientIndex = this.getShoppingListIngredientIndexByName(editedElement.name);

    if (existingIngredientIndex !== -1) {
      this.shoppingList.ingredients[existingIngredientIndex].amount += editedElement.amount;

      this.shoppingList.ingredients.splice(editedElement.arrayIndex, 1);
    } else {
      this.shoppingList.ingredients[editedElement.arrayIndex] = {
        amount: editedElement.amount,
        name: editedElement.name,
      } as ShoppingListIngredientModel;
    }

    this.refreshShoppingListIngredientsSubject.next(this.shoppingList.ingredients);
  }

  public deleteIngredientFromShoppingList(arrayIndex: number): void {
    this.shoppingList.ingredients.splice(arrayIndex, 1);

    this.refreshShoppingListIngredientsSubject.next(this.shoppingList.ingredients);
  }

  public saveShoppingList() {
    const requestModel: SaveShoppingListRequestModel = {
      ingredients: this.shoppingList.ingredients,
    } as SaveShoppingListRequestModel;

    this.shoppingListHttpService.saveShoppingList(requestModel).subscribe(
      () => {
        this.shoppingListSavedSubject.next();
      },
      err => {
        console.log(err);
      }
    );
  }

  public addRecipeIngredientsToShoppingList(recipeIngredients: GetRecipeByIdIngredientListItemResponseModel[]): void {
    for (const item of recipeIngredients) {
      this.addNewShoppingListIngredientToShoppingList({
        name: item.name,
        amount: item.amount,
      } as ShoppingListIngredientModel);
    }

    this.refreshShoppingListIngredientsSubject.next(this.shoppingList.ingredients);
  }

  //#region PRIVATE Helper Methods

  private addNewShoppingListIngredientToShoppingList(newShoppingListIngredient: ShoppingListIngredientModel) {
    const existingIngredientIndex = this.getShoppingListIngredientIndexByName(newShoppingListIngredient.name);

    if (existingIngredientIndex !== -1) {
      this.shoppingList.ingredients[existingIngredientIndex].amount += newShoppingListIngredient.amount;
    } else {
      this.shoppingList.ingredients.push(newShoppingListIngredient);
    }
  }

  private getShoppingListIngredientIndexByName(name: string): number {
    return this.shoppingList.ingredients.findIndex(x => x.name.toLowerCase() === name.trim().toLowerCase());
  }

  //#endregion
}
