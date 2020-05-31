import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { faPlus, faTrashAlt, faSyncAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingEditValidator } from './validators/shopping-edit-validators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;
  trashIcon: IconDefinition = faTrashAlt;
  clearIcon: IconDefinition = faSyncAlt;

  shoppingEditForm = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'amount': new FormControl(null, [Validators.required, ShoppingEditValidator.amountValidator, ShoppingEditValidator.maxAmountValueValidator])
  })

  public get name() {
    return this.shoppingEditForm.get('name');
  }

  public get amount() {
    return this.shoppingEditForm.get('amount');
  }

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

  }

  onAddNewItem() {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.name.value,
        this.amount.value));
  }
}
