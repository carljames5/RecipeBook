import { faSave, faPlus, faRedoAlt, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { RecipeFormValidator } from 'src/app/recipes/validators/recipe-form-validators';
import { RecipeService } from 'src/app/recipes/services/recipe.service';
import { EditRecipeIngredientListItemResponseModel } from 'src/app/recipes/models/response-models/edit-recipe-ingredient-list-item-response.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  providers: [RecipeFormValidator],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipeEditSubscription: Subscription;
  private recipeUpdatedSubscription: Subscription;

  public plusIcon: IconDefinition = faPlus;
  public saveIcon: IconDefinition = faSave;
  public cancelIcon: IconDefinition = faRedoAlt;
  public deleteIcon: IconDefinition = faTrashAlt;

  public recipeForm: FormGroup;

  //#region GETTERS

  public recipeId(): AbstractControl {
    return this.recipeForm.get('id');
  }

  public recipeName(): AbstractControl {
    return this.recipeForm.get('name');
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
    private recipeService: RecipeService,
    private recipeFormValidator: RecipeFormValidator,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeService.editRecipe(+params['id']);
    });

    this.recipeEditSubscription = this.recipeService.recipeEditSubject.subscribe(recipe => {
      this.recipeForm = new FormGroup({
        id: new FormControl(recipe.id),
        name: new FormControl(recipe.name, [Validators.required]),
        imagePath: new FormControl(recipe.imagePath, [Validators.required]),
        description: new FormControl(recipe.description, [Validators.required]),
        ingredients: this.initRecipeIngredientsFormArray(recipe.ingredients),
      });

      this.recipeForm.controls['name'].setAsyncValidators(
        this.recipeFormValidator.recipeNameValidator(this.recipeId())
      );
    });

    this.recipeUpdatedSubscription = this.recipeService.recipeUpdated.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  ngOnDestroy(): void {
    this.recipeEditSubscription.unsubscribe();
    this.recipeUpdatedSubscription.unsubscribe();
  }

  public onUpdateRecipe(): void {
    this.recipeService.updateRecipe(this.recipeForm.value);
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public onAddNewRecipeIngredient() {
    this.ingredients.push(this.createNewRecipeIngredientFormGroup());
  }

  public onDeleteRecipeIngredient(index: number): void {
    if (index !== null && index !== undefined && index >= 0) {
      this.ingredients.removeAt(index);
    }
  }

  // #region PRIVATE Helper Methods

  private initRecipeIngredientsFormArray(recipeIngredients: EditRecipeIngredientListItemResponseModel[]): FormArray {
    const recipeIngredientsFormArray: FormArray = new FormArray([]);

    for (let recipeIngredient of recipeIngredients) {
      recipeIngredientsFormArray.push(this.createNewRecipeIngredientFormGroup(recipeIngredient));
    }

    return recipeIngredientsFormArray;
  }

  private createNewRecipeIngredientFormGroup(
    recipeIngredient: EditRecipeIngredientListItemResponseModel = null
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(recipeIngredient?.name, Validators.required),
      amount: new FormControl(recipeIngredient?.amount, [
        Validators.required,
        this.recipeFormValidator.ingredientAmountValidator,
        this.recipeFormValidator.maxIngredientAmountValueValidator,
      ]),
    });
  }

  // #endregion
}
