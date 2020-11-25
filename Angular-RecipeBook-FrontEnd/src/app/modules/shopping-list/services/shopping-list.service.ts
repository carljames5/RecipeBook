import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ShoppingListHttpService } from './shopping-list-http.service';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';

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

  public shoppingListCleared$ = new Subject();
  public shoppingListIngredients$ = new Subject<ShoppingListIngredientModel[]>();
  public shoppingListIngredientToBeEdited$ = new Subject<EditShoppingListIngredientModel>();

  constructor(
    private toastrService: ToastrService,
    private loadingSpinnerService: LoadingSpinnerService,
    private shoppingListHttpService: ShoppingListHttpService
  ) {
    this.shoppingList = { ingredients: [] } as ShoppingListModel;
  }

  public getLastSavedShoppingList() {
    this.loadingSpinnerService.show('Fetching shopping list...');

    this.shoppingListHttpService
      .getLastSavedShoppingList()
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe((response: GetLastSavedShoppingListResponseModel) => {
        this.shoppingList.ingredients = response.ingredients;

        this.toastrService.success('The shopping list was fetch successfully!', null, {
          titleClass: 'title success',
        });

        this.shoppingListIngredients$.next(this.shoppingList.ingredients);
      });
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

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
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

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public deleteIngredientFromShoppingList(arrayIndex: number): void {
    this.shoppingList.ingredients.splice(arrayIndex, 1);

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public saveShoppingList(): void {
    const requestModel: SaveShoppingListRequestModel = {
      ingredients: this.shoppingList.ingredients,
    } as SaveShoppingListRequestModel;

    this.loadingSpinnerService.show('Saving shopping list...');

    this.shoppingListHttpService
      .saveShoppingList(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.toastrService.success('Shopping list saved successfully!', null, {
          titleClass: 'title success',
        });
      });
  }

  public addRecipeIngredientsToShoppingList(recipeIngredients: GetRecipeByIdIngredientListItemResponseModel[]): void {
    for (const item of recipeIngredients) {
      this.addNewShoppingListIngredientToShoppingList({
        name: item.name,
        amount: item.amount,
      } as ShoppingListIngredientModel);
    }

    this.toastrService.success('This recipe ingredients successfully added to your shopping list!', null, {
      titleClass: 'title success',
    });

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public clearingShoppingListIngredients(): void {
    this.shoppingList.ingredients = [];

    this.shoppingListCleared$.next();
    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  //#region PRIVATE Helper Methods

  private addNewShoppingListIngredientToShoppingList(newShoppingListIngredient: ShoppingListIngredientModel): void {
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
