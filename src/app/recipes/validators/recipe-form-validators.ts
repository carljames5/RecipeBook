import { Injectable } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { RecipeHttpService } from '../services/recipe-http.service';
import { RecipeNameIsExistRequestModel } from '../models/request-models/recipeNameIsExistRequestModel.model';

@Injectable()
export class RecipeFormValidator {
  constructor(private recipeHttpService: RecipeHttpService) {}

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

  public recipeNameValidator(id: AbstractControl, name: AbstractControl): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.recipeHttpService
        .checkRecipeNameIsExist(new RecipeNameIsExistRequestModel(id.value, name.value))
        .pipe(
          map(response => {
            if (response.recipeNameIsExist) {
              return { recipeNameIsExist: true };
            } else {
              return null;
            }
          })
        );
    };
  }
}
