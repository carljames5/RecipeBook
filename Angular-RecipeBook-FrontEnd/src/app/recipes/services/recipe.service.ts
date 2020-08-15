import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

import { UpdateRecipeRequestModel } from '../models/request-models/updateRecipeRequestModel.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';
import { RecipeHttpService } from './recipe-http.service';
import { CreateRecipeRequestModel } from '../models/request-models/createRecipeRequestModel.model';
import { GetRecipeByIdResponseModel } from '../models/response-models/getRecipeByIdResponseModel.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';
import { GetAllRecipeListItemResponseModel } from '../models/response-models/get-all-recipe-list-item-response.model';

@Injectable()
export class RecipeService {
  public recipeGetByIdResolve = new Subject<GetRecipeByIdResponseModel>();
  public recipesChanged = new Subject<GetAllRecipeListItemResponseModel[]>();
  public recipeAdded = new Subject();
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

  public updateRecipe(recipe: UpdateRecipeRequestModel): void {
    this.recipeHttpService.updateRecipe(recipe).subscribe(
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

  public addRecipeIngredientsToShoppingList(ingredients: RecipeIngredient[]): void {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }
}
