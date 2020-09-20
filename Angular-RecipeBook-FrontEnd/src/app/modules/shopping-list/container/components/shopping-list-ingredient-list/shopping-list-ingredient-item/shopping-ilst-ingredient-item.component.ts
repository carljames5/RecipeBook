import { Component, Input } from '@angular/core';

import { ShoppingListService } from 'src/app/modules/shopping-list/services/shopping-list.service';
import { ShoppingListIngredientModel } from 'src/app/modules/shopping-list/models/shopping-list-ingredient.model';
import { EditShoppingListIngredientModel } from 'src/app/modules/shopping-list/models/edit-shopping-list-ingredient.model';

@Component({
  selector: 'shopping-list-ingredient-item',
  templateUrl: './shopping-list-ingredient-item.component.html',
  styleUrls: ['./shopping-list-ingredient-item.component.scss'],
})
export class ShoppingListIngredientItemComponent {
  @Input() ingredient: ShoppingListIngredientModel;
  @Input() arrayIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  public onEditItem(arrayIndex: number): void {
    const editingElement: EditShoppingListIngredientModel = this.shoppingListService.getShoppingListIngredientForEdit(
      arrayIndex
    );

    this.shoppingListService.shoppingListIngredientWasLoadedForEditingSubject.next(editingElement);
  }
}
