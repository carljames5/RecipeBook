import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { faPlus, faTrashAlt, faSyncAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;
  trashIcon: IconDefinition = faTrashAlt;
  clearIcon: IconDefinition = faSyncAlt;

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

  }

  onAddNewItem() {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.name.nativeElement.value,
        this.amount.nativeElement.value));
  }
}
