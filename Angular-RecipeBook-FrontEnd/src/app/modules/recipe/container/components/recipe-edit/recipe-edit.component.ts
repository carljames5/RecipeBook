import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { RecipeService } from '../../../services/recipe.service';
import { RecipeFormValidator } from '../../../validators/recipe-form-validators';
import { EditRecipeIngredientListItemResponseModel } from '../../../models/response-models/edit-recipe-ingredient-list-item-response.model';
import { AppHeaderService } from 'src/app/core/services/app-header.service';
import { MODULE_NAMES } from '../../../constants/module-names.constant';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  providers: [RecipeFormValidator],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public recipeForm: FormGroup;

  //#region GETTERS

  public recipeId(): AbstractControl {
    return this.recipeForm.get('id');
  }

  public recipeName(): AbstractControl {
    return this.recipeForm.get('name');
  }

  public recipeImgPath(): AbstractControl {
    return this.recipeForm.get('imagePath');
  }

  public recipeDescription(): AbstractControl {
    return this.recipeForm.get('description');
  }

  public get ingredients(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  public ingredientName(index: number): AbstractControl {
    return this.ingredients.at(index).get('name');
  }

  public ingredientAmount(index: number): AbstractControl {
    return this.ingredients.at(index).get('amount');
  }

  //#endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private appHeaderService: AppHeaderService,
    private recipeFormValidator: RecipeFormValidator
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeService.getrecipeForEditing(+params['id']);
    });

    this.subscriptions.push(
      this.recipeService.recipeWasLoadedForEditingSubject.subscribe(recipe => {
        this.recipeForm = new FormGroup({
          id: new FormControl(recipe.id),
          name: new FormControl(recipe.name, [Validators.required]),
          imagePath: new FormControl(recipe.imagePath, [Validators.required]),
          description: new FormControl(recipe.description, [Validators.required]),
          ingredients: this.initRecipeIngredientsFormArray(recipe.ingredients),
        });

        this.recipeName().setAsyncValidators(this.recipeFormValidator.recipeNameValidator(this.recipeId()));
      })
    );

    this.subscriptions.push(
      this.recipeService.updatedRecipeItemSubject.subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })
    );

    this.appHeaderService.subTitle$.next(MODULE_NAMES['MAIN']);
    this.appHeaderService.mainTitle$.next(MODULE_NAMES['EDIT']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onAddNewRecipeIngredient() {
    this.ingredients.push(this.createNewRecipeIngredientFormGroup());
  }

  public onDeleteRecipeIngredient(index: number): void {
    if (index !== null && index !== undefined && index >= 0) {
      this.ingredients.removeAt(index);
    }
  }

  public onUpdateRecipe(): void {
    this.recipeService.updateRecipe(this.recipeForm.value);
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // #region PRIVATE Helper Methods

  private initRecipeIngredientsFormArray(recipeIngredients: EditRecipeIngredientListItemResponseModel[]): FormArray {
    const recipeIngredientsFormArray: FormArray = new FormArray([]);

    for (const ingredientItem of recipeIngredients) {
      recipeIngredientsFormArray.push(this.createNewRecipeIngredientFormGroup(ingredientItem));
    }

    return recipeIngredientsFormArray;
  }

  private createNewRecipeIngredientFormGroup(recipeIngredient?: EditRecipeIngredientListItemResponseModel): FormGroup {
    return new FormGroup({
      name: new FormControl(recipeIngredient?.name, Validators.required),
      amount: new FormControl(recipeIngredient?.amount, [
        Validators.required,
        this.recipeFormValidator.maxIngredientAmountValueValidator,
      ]),
    });
  }

  // #endregion
}
