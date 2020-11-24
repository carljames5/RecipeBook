import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { RecipeHttpService } from './recipe-http.service';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';
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
  public allRecipeItem$: Subject<GetAllRecipeListItemResponseModel[]> = new Subject<
    GetAllRecipeListItemResponseModel[]
  >();
  public recipeItemById$: Subject<GetRecipeByIdResponseModel> = new Subject<GetRecipeByIdResponseModel>();
  public recipeItemToBeEdited$: Subject<GetRecipeForEditingResponseModel> = new Subject<GetRecipeForEditingResponseModel>();

  public recipeItemCreated$ = new Subject();
  public recipeItemUpdated$ = new Subject();
  public recipeItemDeleted$ = new Subject();

  public constructor(
    private recipeHttpService: RecipeHttpService,
    private shoppingListService: ShoppingListService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  public refreshRecipeItems(): void {
    this.loadingSpinnerService.show('Loading recipes...');

    this.recipeHttpService
      .getAllRecipe()
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe((resposne: GetAllRecipeResponseModel) => {
        this.allRecipeItem$.next(resposne.recipes);
      });
  }

  public getRecipeById(requestModel: GetRecipeByIdRequestModel): void {
    this.loadingSpinnerService.show('Loading recipe details...');

    this.recipeHttpService
      .getRecipeById(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe((recipe: GetRecipeByIdResponseModel) => {
        this.recipeItemById$.next(recipe);
      });
  }

  public getrecipeForEditing(requestModel: GetRecipeForEditingRequestModel): void {
    this.loadingSpinnerService.show('Loading recipe for editing...');

    this.recipeHttpService
      .getRecipeForEditing(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe((recipe: GetRecipeForEditingResponseModel) => {
        this.recipeItemToBeEdited$.next(recipe);
      });
  }

  public createRecipe(requestModel: CreateRecipeRequestModel): void {
    this.loadingSpinnerService.show('Saving recipe...');

    this.recipeHttpService
      .createNewRecipe(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.refreshRecipeItems();

        this.recipeItemCreated$.next();
      });
  }

  public updateRecipe(requestModel: UpdateRecipeRequestModel): void {
    this.loadingSpinnerService.show('Update recipe...');

    this.recipeHttpService
      .updateRecipe(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.refreshRecipeItems();

        this.recipeItemUpdated$.next();
      });
  }

  public deleteRecipe(requestModel: DeleteRecipeRequestModel): void {
    this.loadingSpinnerService.show('Delete recipe...');

    this.recipeHttpService
      .deleteRecipe(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.refreshRecipeItems();

        this.recipeItemDeleted$.next();
      });
  }

  public addRecipeIngredientsToShoppingList(ingredients: GetRecipeByIdIngredientListItemResponseModel[]): void {
    this.shoppingListService.addRecipeIngredientsToShoppingList(ingredients);
  }
}
