import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';
import { IngredientsService } from '../../shared/services/ingredients.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

import { Recipe } from '../models/recipe.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[];

  public recipesChanged = new Subject<Recipe[]>();

  public constructor(
    private shoppingListService: ShoppingListService,
    private ingredientsService: IngredientsService,
    private commonFunctionsService: CommonFunctionsService
  ) {
    this.recipes = this.initializeRecipes();
  }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipeById(id: number): Recipe {
    return this.recipes.find(x => x.id === id);
  }

  public addRecipeIngredientsToShoppingList(ingredients: RecipeIngredient[]): void {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  public createRecipe(recipe: Recipe): void {
    recipe.ingredients = this.mapInputRecipeIngredientsToRecipeIngrededientsArray(recipe.ingredients);

    recipe.id = this.recipes[this.recipes.length - 1].id + 1;
    this.recipes.push(recipe);

    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(recipe: Recipe): void {
    recipe.ingredients = this.mapInputRecipeIngredientsToRecipeIngrededientsArray(recipe.ingredients);

    this.recipes[this.recipes.findIndex(x => x.id === recipe.id)] = recipe;

    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(id: number): void {
    const recipeIndex = this.recipes.findIndex(x => x.id === id);

    if (recipeIndex !== -1) {
      this.recipes.splice(recipeIndex, 1);

      this.recipesChanged.next(this.recipes.slice());
    }
  }

  public checkRecipeNameIsExist(id: number, name: string): boolean {
    return this.recipes.findIndex(x => x.name.toLowerCase().trim() === name.toLowerCase().trim() && x.id !== id) !== -1;
  }

  //#region PRIVATE Helper Methods

  private mapInputRecipeIngredientsToRecipeIngrededientsArray(ingredients: any[]): RecipeIngredient[] {
    const recipeIngredients: RecipeIngredient[] = [];

    ingredients.forEach(item => {
      const ingredientId = this.ingredientsService.getIngredientIdByName(item.ingredientName);

      if (!ingredientId) {
        const ingredient = this.ingredientsService.addIngredient(
          new Ingredient(null, this.commonFunctionsService.wordCapitalize(item.ingredientName))
        );

        recipeIngredients.push(new RecipeIngredient(ingredient.id, ingredient.name, item.ingredientAmount));
      } else {
        const recipeIngredientIndex = recipeIngredients.findIndex(x => x.id === ingredientId);

        if (recipeIngredientIndex !== -1) {
          recipeIngredients[recipeIngredientIndex].amount += item.ingredientAmount;
        } else {
          recipeIngredients.push(
            new RecipeIngredient(
              ingredientId,
              this.commonFunctionsService.wordCapitalize(item.ingredientName),
              item.ingredientAmount
            )
          );
        }
      }
    });

    return recipeIngredients;
  }

  private initializeRecipes(): Recipe[] {
    const recipes: Recipe[] = [
      new Recipe(
        1,
        'First Recipe',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        'https://www.gimmesomeoven.com/wp-content/uploads/2020/01/Best-Chili-Recipe-1-1.jpg',
        [new RecipeIngredient(null, 'Meat', null), new RecipeIngredient(null, 'French Fries', null)]
      ),
      new Recipe(
        2,
        'Second Recipe',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
          "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and " +
          'scrambled it to make a type specimen book.',
        'https://pinchofyum.com/wp-content/uploads/Buffalo-Cauliflower-Tacos-with-Avocado-Crema-Recipe.jpg',
        [new RecipeIngredient(null, 'Buns', null), new RecipeIngredient(null, 'Meat', null)]
      ),
    ];

    recipes.forEach(recipe =>
      recipe.ingredients.forEach(ingredient => {
        ingredient.id = this.ingredientsService.getIngredientIdByName(ingredient.name);
        ingredient.amount = this.commonFunctionsService.generateRandomAmount(1, 20);
      })
    );

    return recipes;
  }

  //#endregion
}
