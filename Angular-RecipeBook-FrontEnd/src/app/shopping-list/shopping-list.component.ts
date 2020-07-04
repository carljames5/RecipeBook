import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from './services/shopping-list.service';
import { ShoppingListIngredient } from './models/shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private shoppingListIngredientsChangedSubscription: Subscription;

  public shoppingListIngredients: ShoppingListIngredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  public ngOnInit(): void {
    this.shoppingListIngredients = this.shoppingListService.getShoppingListIngredients();

    this.shoppingListIngredientsChangedSubscription = this.shoppingListService.shoppingListIngredientsChanged.subscribe(
      (shoppingListIngredients: ShoppingListIngredient[]) => {
        this.shoppingListIngredients = shoppingListIngredients;
      }
    );
  }

  public ngOnDestroy(): void {
    this.shoppingListIngredientsChangedSubscription.unsubscribe();
  }

  public onEditItem(arrayIndex: number): void {
    this.shoppingListService.shoppingListIngredientEditing.next(arrayIndex);
  }
}
