import { faSave, faPlus, faRedoAlt, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { RecipeFormValidator } from 'src/app/recipes/validators/recipe-form-validators';
import { RecipeService } from 'src/app/recipes/services/recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
  providers: [RecipeFormValidator],
})
export class RecipeCreateComponent implements OnInit, OnDestroy {
  private recipeAddedSubscription: Subscription;

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
    this.recipeForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      ingredients: new FormArray([]),
    });

    this.recipeForm.controls['name'].setAsyncValidators(this.recipeFormValidator.recipeNameValidator(this.recipeId()));

    this.recipeAddedSubscription = this.recipeService.recipeAdded.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  ngOnDestroy(): void {
    this.recipeAddedSubscription.unsubscribe();
  }

  public onCreateRecipe(): void {
    this.recipeService.createRecipe(this.recipeForm.value);
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public onAddNewRecipeIngredient(): void {
    this.ingredients.push(this.createNewRecipeIngredientFormGroup());
  }

  public onDeleteRecipeIngredient(index: number): void {
    if (index !== null && index !== undefined && index >= 0) {
      this.ingredients.removeAt(index);
    }
  }

  // #region PRIVATE Helper Methods

  private createNewRecipeIngredientFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        this.recipeFormValidator.ingredientAmountValidator,
        this.recipeFormValidator.maxIngredientAmountValueValidator,
      ]),
    });
  }

  // #endregion
}
