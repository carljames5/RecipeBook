import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

import { RecipeHttpService } from './recipe-http.service';
import { CreateRecipeRequestModel } from '../models/request-models/createRecipeRequestModel.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';
import { GetAllRecipeListItemResponseModel } from '../models/response-models/get-all-recipe-list-item-response.model';
import { GetRecipeByIdResponseModel } from '../models/response-models/get-recipe-by-id-response.model';
import { GetRecipeByIdIngredientListItemResponseModel } from '../models/response-models/get-recipe-by-id-ingredient-list-item-response.model';
import { EditRecipeResponseModel } from '../models/response-models/edit-recipe-response.model';
import { UpdateRecipeRequestModel } from '../models/request-models/update-recipe-request.model';

@Injectable()
export class RecipeService {
  public recipeGetByIdResolve = new Subject<GetRecipeByIdResponseModel>();
  public recipesChanged = new Subject<GetAllRecipeListItemResponseModel[]>();
  public recipeAdded = new Subject();
  public recipeEditSubject = new Subject<EditRecipeResponseModel>();
  public recipeUpdated = new Subject();
  public recipeDeleted = new Subject();

  public constructor(private shoppingListService: ShoppingListService, private recipeHttpService: RecipeHttpService) {}

  public getAllRecipe(): void {
    this.recipeHttpService.getAllRecipe().subscribe(
      (response: GetAllRecipeResponseModel) => {
        this.recipesChanged.next(response.recipes);
      },
      err => {
        console.log(err);
      }
    );
  }

  public getRecipeById(id: number): void {
    this.recipeHttpService.getRecipeById(id).subscribe(
      (recipe: GetRecipeByIdResponseModel) => {
        this.recipeGetByIdResolve.next(recipe);
      },
      err => {
        console.log(err);
      }
    );
  }

  public editRecipe(id: number): void {
    this.recipeHttpService.editRecipe(id).subscribe(
      (recipe: EditRecipeResponseModel) => {
        this.recipeEditSubject.next(recipe);
      },
      err => {
        console.log(err);
      }
    );
  }

  public createRecipe(recipe: CreateRecipeRequestModel): void {
    this.recipeHttpService.createNewRecipe(recipe).subscribe(
      () => {
        this.recipeAdded.next();
      },
      err => {
        console.log(err);
      }
    );
  }

  public updateRecipe(requestModel: UpdateRecipeRequestModel): void {
    this.recipeHttpService.updateRecipe(requestModel).subscribe(
      () => {
        this.recipeUpdated.next();
      },
      err => {
        console.log(err);
      }
    );
  }

  public deleteRecipe(id: number): void {
    this.recipeHttpService.deleteRecipe(id).subscribe(
      () => {
        this.recipeDeleted.next();
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
