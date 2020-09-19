import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { RecipeHttpService } from './recipe-http.service';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

import { CreateRecipeRequestModel } from '../models/request-models/create-recipe-request.model';
import { UpdateRecipeRequestModel } from '../models/request-models/update-recipe-request.model';
import { DeleteRecipeRequestModel } from '../models/request-models/delete-recipe-request.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';
import { GetRecipeByIdRequestModel } from '../models/request-models/get-recipe-by-id-request.model';
import { GetRecipeByIdResponseModel } from '../models/response-models/get-recipe-by-id-response.model';
import { GetRecipeForEditingRequestModel } from '../models/request-models/get-recipe-for-editing-request.model';
import { GetRecipeForEditingResponseModel } from '../models/response-models/get-recipe-for-editing-response.model';
import { GetAllRecipeListItemResponseModel } from '../models/response-models/get-all-recipe-list-item-response.model';
import { GetRecipeByIdIngredientListItemResponseModel } from '../models/response-models/get-recipe-by-id-ingredient-list-item-response.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public refreshRecipeItemsSubject = new Subject<GetAllRecipeListItemResponseModel[]>();
  public getRecipeByIdSubject = new Subject<GetRecipeByIdResponseModel>();

  public createdRecipeItemSubject = new Subject();
  public updatedRecipeItemSubject = new Subject();
  public deletedRecipeItemSubject = new Subject();
  public recipeWasLoadedForEditingSubject = new Subject<GetRecipeForEditingResponseModel>();

  public constructor(private shoppingListService: ShoppingListService, private recipeHttpService: RecipeHttpService) {}

  public refreshRecipeItems(): void {
    this.recipeHttpService.getAllRecipe().subscribe(
      (resposne: GetAllRecipeResponseModel) => {
        this.refreshRecipeItemsSubject.next(resposne.recipes);
      },
      err => {
        console.log(err);
      }
    );
  }

  public getRecipeById(id: number): void {
    const requestModel: GetRecipeByIdRequestModel = {} as GetRecipeByIdRequestModel;
    requestModel.id = id;

    this.recipeHttpService.getRecipeById(requestModel).subscribe(
      (recipe: GetRecipeByIdResponseModel) => {
        this.getRecipeByIdSubject.next(recipe);
      },
      err => {
        console.log(err);
      }
    );
  }

  public getrecipeForEditing(id: number): void {
    const requestModel: GetRecipeForEditingRequestModel = {} as GetRecipeForEditingRequestModel;
    requestModel.id = id;

    this.recipeHttpService.getRecipeForEditing(requestModel).subscribe(
      (recipe: GetRecipeForEditingResponseModel) => {
        this.recipeWasLoadedForEditingSubject.next(recipe);
      },
      err => {
        console.log(err);
      }
    );
  }

  public createRecipe(createRecipeFormValue: any): void {
    const requestModel: CreateRecipeRequestModel = createRecipeFormValue;

    this.recipeHttpService.createNewRecipe(requestModel).subscribe(
      () => {
        this.refreshRecipeItems();
        this.createdRecipeItemSubject.next();
      },
      err => {
        console.log(err);
      }
    );
  }

  public updateRecipe(updateRecipeFormValue: any): void {
    const requestModel: UpdateRecipeRequestModel = updateRecipeFormValue;

    this.recipeHttpService.updateRecipe(requestModel).subscribe(
      () => {
        this.refreshRecipeItems();
        this.updatedRecipeItemSubject.next();
      },
      err => {
        console.log(err);
      }
    );
  }

  public deleteRecipe(id: number): void {
    const requestModel: DeleteRecipeRequestModel = {} as DeleteRecipeRequestModel;
    requestModel.id = id;

    this.recipeHttpService.deleteRecipe(requestModel).subscribe(
      () => {
        this.refreshRecipeItems();
        this.deletedRecipeItemSubject.next();
      },
      err => {
        console.log(err);
      }
    );
  }

  public addRecipeIngredientsToShoppingList(ingredients: GetRecipeByIdIngredientListItemResponseModel[]): void {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }
}
