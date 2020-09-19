import { Component, Input } from '@angular/core';
import { ShoppingListIngredient } from 'src/app/modules/shopping-list/models/shopping-list.model';
import { ShoppingListService } from 'src/app/modules/shopping-list/services/shopping-list.service';

@Component({
  selector: 'shopping-list-ingredient-item',
  templateUrl: './shopping-list-ingredient-item.component.html',
  styleUrls: ['./shopping-list-ingredient-item.component.scss'],
})
export class ShoppingListIngredientItemComponent {
  @Input() ingredient: ShoppingListIngredient;
  @Input() arrayIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  public onEditItem(arrayIndex: number): void {
    this.shoppingListService.shoppingListIngredientEditing.next(arrayIndex);
  }
}
