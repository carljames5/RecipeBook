import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { faPlus, faTrashAlt, faSyncAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;
  trashIcon: IconDefinition = faTrashAlt;
  clearIcon: IconDefinition = faSyncAlt;

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  @Output() onAddNewItemHandler = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {

  }

  onAddNewItem() {
    this.onAddNewItemHandler.emit(new Ingredient(
      this.name.nativeElement.value,
      this.amount.nativeElement.value));
  }
}
