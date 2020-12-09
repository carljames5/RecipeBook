import { Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ShoppingListHttpService } from './shopping-list-http.service';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';

import { ShoppingListModel } from '../models/shopping-list.model';
import { ShoppingListIngredientModel } from '../models/shopping-list-ingredient.model';
import { RecipeIngredientListItemModel } from '../../recipe/models/recipe-ingredient-list-item.model';
import { SaveShoppingListRequestModel } from '../models/request-models/save-shopping-list-request.model';
import { GetLastSavedShoppingListResponseModel } from '../models/response-models/get-last-saved-shopping-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: ShoppingListModel;

  public shoppingListIngredient$ = new Subject<ShoppingListIngredientModel>();
  public shoppingListIngredients$ = new Subject<ShoppingListIngredientModel[]>();
  public shoppingListIngredientFormClear$ = new Subject();

  constructor(
    private toastrService: ToastrService,
    private loadingSpinnerService: LoadingSpinnerService,
    private shoppingListHttpService: ShoppingListHttpService
  ) {
    this.shoppingList = { ingredients: [] } as ShoppingListModel;
  }

  public addRecipeIngredientsToShoppingList(recipeIngredients: RecipeIngredientListItemModel[]): void {
    recipeIngredients.forEach(item => {
      this.addNewShoppingListIngredientToShoppingList({
        name: item.name,
        amount: item.amount,
      } as ShoppingListIngredientModel);
    });

    this.toastrService.success('This recipe ingredients successfully added to your shopping list!', null, {
      titleClass: 'title success',
    });

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public getShoppingListIngredients(): ShoppingListIngredientModel[] {
    return this.shoppingList.ingredients;
  }

  public getShoppingListIngredientByIndex(index: number): void {
    const selectedItem: ShoppingListIngredientModel = this.shoppingList.ingredients[index];

    this.shoppingListIngredient$.next(selectedItem);
  }

  public addShoppingListIngredientToShoppingList(shoppingListIngredient: ShoppingListIngredientModel): void {
    this.addNewShoppingListIngredientToShoppingList(shoppingListIngredient);

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public updateShoppingListIngredientInShoppingList(shoppingListIngredient: ShoppingListIngredientModel): void {
    const existingIngredientIndex = this.getShoppingListIngredientIndexByName(shoppingListIngredient.name);

    if (existingIngredientIndex !== -1) {
      this.shoppingList.ingredients[existingIngredientIndex].amount += shoppingListIngredient.amount;

      if (existingIngredientIndex !== shoppingListIngredient.arrayIndex) {
        this.shoppingList.ingredients.splice(shoppingListIngredient.arrayIndex, 1);

        this.reIndexShoppingListIngredientsArray();
      }
    } else {
      this.shoppingList.ingredients[shoppingListIngredient.arrayIndex] = shoppingListIngredient;
    }

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public deleteIngredientFromShoppingList(arrayIndex: number): void {
    this.shoppingList.ingredients.splice(arrayIndex, 1);

    this.reIndexShoppingListIngredientsArray();

    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public clearingShoppingListIngredients(): void {
    this.shoppingList.ingredients = [];

    this.shoppingListIngredientFormClear$.next();
    this.shoppingListIngredients$.next(this.shoppingList.ingredients);
  }

  public getLastSavedShoppingList() {
    this.loadingSpinnerService.show('Fetching shopping list...');

    this.shoppingListHttpService
      .getLastSavedShoppingList()
      .pipe(
        map((response: GetLastSavedShoppingListResponseModel) => {
          const shoppingList: ShoppingListModel = {} as ShoppingListModel;
          shoppingList.ingredients = response.ingredients.map(
            (item, index) =>
              ({
                arrayIndex: index,
                name: item.name,
                amount: item.amount,
              } as ShoppingListIngredientModel)
          );

          return shoppingList;
        }),
        finalize(() => this.loadingSpinnerService.hide())
      )
      .subscribe((response: ShoppingListModel) => {
        this.shoppingList.ingredients = response.ingredients;

        this.toastrService.success('The shopping list was fetch successfully!', null, {
          titleClass: 'title success',
        });

        this.shoppingListIngredients$.next(this.shoppingList.ingredients);
      });
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

  //#region PRIVATE Helper Methods

  private addNewShoppingListIngredientToShoppingList(newShoppingListIngredient: ShoppingListIngredientModel): void {
    const existingIngredientIndex = this.getShoppingListIngredientIndexByName(newShoppingListIngredient.name);

    if (existingIngredientIndex !== -1) {
      this.shoppingList.ingredients[existingIngredientIndex].amount += newShoppingListIngredient.amount;
    } else {
      newShoppingListIngredient.arrayIndex = this.shoppingList.ingredients.length;

      this.shoppingList.ingredients.push(newShoppingListIngredient);
    }
  }

  private reIndexShoppingListIngredientsArray(): void {
    this.shoppingList.ingredients = this.shoppingList.ingredients.map((item, index) => {
      return { arrayIndex: index, name: item.name, amount: item.amount } as ShoppingListIngredientModel;
    });
  }

  private getShoppingListIngredientIndexByName(name: string): number {
    return this.shoppingList.ingredients.findIndex(x => x.name.toLowerCase() === name.trim().toLowerCase());
  }

  //#endregion
}
