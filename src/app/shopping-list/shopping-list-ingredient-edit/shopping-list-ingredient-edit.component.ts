import { faPlus, faTrashAlt, faSyncAlt, IconDefinition, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../services/shopping-list.service';
import { ShoppingListIngredientFormValidator } from './validators/shopping-list-ingredient-form-validators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-list-ingredient-edit.component.html',
  styleUrls: ['./shopping-list-ingredient-edit.component.scss'],
})
export class ShoppingListIngredientEditComponent implements OnInit, OnDestroy {
  private shoppingListIngredientEditingSubscript: Subscription;

  public plusIcon: IconDefinition = faPlus;
  public trashIcon: IconDefinition = faTrashAlt;
  public clearIcon: IconDefinition = faEraser;
  public updateIcon: IconDefinition = faSyncAlt;

  public shoppingListIngredientForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    amount: new FormControl(null, [
      Validators.required,
      ShoppingListIngredientFormValidator.amountValidator,
      ShoppingListIngredientFormValidator.maxAmountValueValidator,
    ]),
  });

  //#region GETTERS

  public get id(): AbstractControl {
    return this.shoppingListIngredientForm.get('id');
  }

  public get name(): AbstractControl {
    return this.shoppingListIngredientForm.get('name');
  }

  public get amount(): AbstractControl {
    return this.shoppingListIngredientForm.get('amount');
  }

  //#endregion

  constructor(private shoppingListService: ShoppingListService) {}

  public ngOnInit(): void {
    this.shoppingListIngredientEditingSubscript = this.shoppingListService.shoppingListIngredientEditing.subscribe(
      id => {
        const selectedIngredient = this.shoppingListService.getShoppingListIngredientById(id);

        this.shoppingListIngredientForm.setValue({
          id: selectedIngredient.id,
          name: selectedIngredient.name,
          amount: selectedIngredient.amount,
        });
      }
    );
  }

  public ngOnDestroy(): void {
    this.shoppingListIngredientEditingSubscript.unsubscribe();
  }

  public onCreateOrUpdateItem(): void {
    if (this.id.value) {
      this.shoppingListService.updateIngredientInShoppingList(this.shoppingListIngredientForm.value);
    } else {
      this.shoppingListService.addIngredientToShoppingList(this.shoppingListIngredientForm.value);
    }

    this.shoppingEditFormReset();
  }

  public onClear(): void {
    this.shoppingEditFormReset();
  }

  public onDelete(): void {
    this.shoppingListService.deleteIngredientFromShoppingList(this.id.value);

    this.shoppingEditFormReset();
  }

  private shoppingEditFormReset(): void {
    this.shoppingListIngredientForm.reset();
  }
}
