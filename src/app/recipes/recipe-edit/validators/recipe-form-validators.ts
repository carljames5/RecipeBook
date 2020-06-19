import { FormControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';

@Injectable()
export class RecipeFormValidator {
  constructor(private recipeService: RecipeService) {}

  public ingredientAmountValidator(control: FormControl): { [s: string]: boolean } {
    const regexp: RegExp = new RegExp('^[1-9]+[0-9]*$');

    if (control.value !== null && !regexp.test(control.value)) {
      return { notValidAmount: true };
    }

    return null;
  }

  public maxIngredientAmountValueValidator(control: FormControl): { [s: string]: boolean } {
    const amountValue: any = control.value;

    if (amountValue !== null && +amountValue > 999999) {
      return { notValidMaxAmountValue: true };
    }

    return null;
  }

  public ingredientNameIsExistValidator(ingredientIdPropName: string, ingredientNamePropName: string): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } | null => {
      const ingredientId = control.get(ingredientIdPropName).value;
      const ingredientName = control.get(ingredientNamePropName).value;

      if (ingredientId === null && ingredientName === null) {
        return null;
      }

      const ingredientNameControl = control.controls[ingredientNamePropName];

      if (this.recipeService.checkRecipeNameIsExist(ingredientId, ingredientName)) {
        ingredientNameControl.setErrors({ ingredientNameIsExist: true });
      } else {
        return null;
      }
    };
  }
}
