import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ShoppingListService } from '../modules/shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private shoppingListIngredientsSavedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.shoppingListIngredientsSavedSubscription = this.shoppingListService.shoppingListIngredientSaved.subscribe(
      () => {
        this.toastr.success('Shopping list saved successfully!', 'Congratulations!');
      }
    );
  }

  onSaveShoppingList(): void {
    this.shoppingListService.saveShoppingListIngredients();
  }

  onFetchShoppingListIngredients(): void {
    this.shoppingListService.fetchShoppingListIngredients();
  }
}
