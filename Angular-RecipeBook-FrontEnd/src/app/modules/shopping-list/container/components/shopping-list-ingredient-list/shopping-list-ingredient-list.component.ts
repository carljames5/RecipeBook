import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListIngredient } from '../../../models/shopping-list.model';
import { ShoppingListService } from '../../../services/shopping-list.service';

@Component({
  selector: 'shopping-list-ingredient-list',
  templateUrl: './shopping-list-ingredient-list.component.html',
  styleUrls: ['./shopping-list-ingredient-list.component.scss'],
})
export class ShoppingListIngredientListComponent implements OnInit, OnDestroy {
  private shoppingListIngredientsChangedSubscription: Subscription;

  public shoppingListIngredients: ShoppingListIngredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
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
}
