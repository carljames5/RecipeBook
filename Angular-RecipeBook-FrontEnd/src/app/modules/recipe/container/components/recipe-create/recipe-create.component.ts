import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { RecipeService } from '../../../services/recipe.service';
import { RecipeFormValidator } from '../../../validators/recipe-form-validators';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
  providers: [RecipeFormValidator],
})
export class RecipeCreateComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public recipeForm: FormGroup;

  //#region GETTERS

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
    private recipeService: RecipeService,
    private recipeFormValidator: RecipeFormValidator,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.recipeService.createdRecipeItemSubject.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }));

    this.recipeForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      ingredients: new FormArray([]),
    });

    this.recipeName().setAsyncValidators(this.recipeFormValidator.recipeNameValidator());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onAddNewRecipeIngredient(): void {
    this.ingredients.push(this.createNewRecipeIngredientFormGroup());
  }

  public onDeleteRecipeIngredient(arrayIndex: number): void {
    if (arrayIndex !== null && arrayIndex !== undefined && arrayIndex >= 0) {
      this.ingredients.removeAt(arrayIndex);
    }
  }

  public onCreateRecipe(): void {
    this.recipeService.createRecipe(this.recipeForm.value);
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // #region PRIVATE Helper Methods

  private createNewRecipeIngredientFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, this.recipeFormValidator.maxIngredientAmountValueValidator]),
    });
  }

  // #endregion
}
