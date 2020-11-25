import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { ShoppingListService } from '../../../services/shopping-list.service';
import { ShoppingListIngredientFormValidator } from '../../../validators/shopping-list-ingredient-form-validators';

@Component({
  selector: 'create-or-edit-shopping-list-ingredient',
  templateUrl: './create-or-edit-shopping-list-ingredient.component.html',
  styleUrls: ['./create-or-edit-shopping-list-ingredient.component.scss'],
})
export class ShoppingListIngredientEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public shoppingListIngredientForm: FormGroup;

  //#region GETTERS

  public get ingredientArrayIndex(): AbstractControl {
    return this.shoppingListIngredientForm.get('arrayIndex');
  }

  public get ingredientName(): AbstractControl {
    return this.shoppingListIngredientForm.get('name');
  }

  public get ingredientAmount(): AbstractControl {
    return this.shoppingListIngredientForm.get('amount');
  }

  //#endregion

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListIngredientForm = new FormGroup({
      arrayIndex: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, ShoppingListIngredientFormValidator.amountValidator]),
    });
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.shoppingListService.shoppingListIngredientToBeEdited$.subscribe(selectedShoppingListIngredient => {
        this.shoppingListIngredientForm.setValue({
          arrayIndex: selectedShoppingListIngredient.arrayIndex,
          name: selectedShoppingListIngredient.name,
          amount: selectedShoppingListIngredient.amount,
        });
      })
    ),
      this.subscriptions.push(
        this.shoppingListService.shoppingListCleared$.subscribe(() => {
          this.onClear();
        })
      );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onCreateOrEditItem(): void {
    if (this.ingredientArrayIndex.value !== null && this.ingredientArrayIndex.value !== undefined) {
      this.shoppingListService.updateShoppingListIngredientInShoppingList(this.shoppingListIngredientForm.value);
    } else {
      this.shoppingListService.addShoppingListIngredientToShoppingList(this.shoppingListIngredientForm.value);
    }

    this.onClear();
  }

  public onDelete(): void {
    this.shoppingListService.deleteIngredientFromShoppingList(this.ingredientArrayIndex.value);

    this.onClear();
  }

  public onClear(): void {
    this.shoppingListIngredientForm.reset();
  }
}
