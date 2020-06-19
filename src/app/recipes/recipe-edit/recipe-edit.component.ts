import { faSave, faPlus, faRedoAlt, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { RecipeService } from '../services/recipe.service';
import { RecipeFormValidator } from './validators/recipe-form-validators';

import { Recipe } from '../models/recipe.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  providers: [RecipeFormValidator],
})
export class RecipeEditComponent implements OnInit {
  public plusIcon: IconDefinition = faPlus;
  public saveIcon: IconDefinition = faSave;
  public cancelIcon: IconDefinition = faRedoAlt;
  public deleteIcon: IconDefinition = faTrashAlt;

  public recipeForm: FormGroup;

  //#region GETTERS

  public get ingredients(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  public ingredientName(index: number) {
    return this.ingredients.at(index).get('ingredientName');
  }

  public ingredientAmount(index: number) {
    return this.ingredients.at(index).get('ingredientAmount');
  }

  //#endregion

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeFormValidator: RecipeFormValidator
  ) {}

  ngOnInit(): void {
    let recipeId: number;

    this.route.params.subscribe((params: Params) => {
      recipeId = +params['id'];
    });

    if (recipeId) {
      const selectedRecipe: Recipe = this.recipeService.getRecipeById(recipeId);

      this.initRecipeForm(selectedRecipe);
    } else {
      this.initRecipeForm();
    }
  }

  public onAddNewRecipeIngredient() {
    this.ingredients.push(this.createNewRecipeIngredientFormGroup());
  }

  public onCreateOrEditRecipe(): void {
    const recipeFormValue: any = this.recipeForm.value;

    if (this.recipeForm.value.id !== null) {
      this.recipeService.updateRecipe(recipeFormValue);
    } else {
      this.recipeService.createRecipe(recipeFormValue);
    }
  }

  // #region PRIVATE RecipeForm Initializer Methods

  private initRecipeForm(recipe: Recipe = null): void {
    this.recipeForm = new FormGroup(
      {
        id: new FormControl(recipe?.id),
        name: new FormControl(recipe?.name, Validators.required),
        imagePath: new FormControl(recipe?.imagePath, Validators.required),
        description: new FormControl(recipe?.description, Validators.required),
        ingredients: this.initRecipeIngredientsFormArray(recipe?.ingredients),
      },
      this.recipeFormValidator.ingredientNameIsExistValidator('id', 'name')
    );
  }

  private initRecipeIngredientsFormArray(recipeIngredients: RecipeIngredient[] = null): FormArray {
    const recipeIngredientsFormArray: FormArray = new FormArray([]);

    if (recipeIngredients) {
      for (let recipeIngredient of recipeIngredients) {
        recipeIngredientsFormArray.push(this.createNewRecipeIngredientFormGroup(recipeIngredient));
      }
    }

    return recipeIngredientsFormArray;
  }

  private createNewRecipeIngredientFormGroup(recipeIngredient: RecipeIngredient = null): FormGroup {
    return new FormGroup({
      ingredientId: new FormControl(recipeIngredient?.id),
      ingredientName: new FormControl(recipeIngredient?.name, Validators.required),
      ingredientAmount: new FormControl(recipeIngredient?.amount, [
        Validators.required,
        this.recipeFormValidator.ingredientAmountValidator,
        this.recipeFormValidator.maxIngredientAmountValueValidator,
      ]),
    });
  }

  // #endregion
}
