import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ShoppingListService } from 'src/app/modules/shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  private shoppingListIngredientsSavedSubscription: Subscription;

  public isExpanded: boolean = false;

  constructor(private shoppingListService: ShoppingListService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.shoppingListIngredientsSavedSubscription = this.shoppingListService.shoppingListIngredientSaved.subscribe(
      () => {
        this.toastr.success('Shopping list saved successfully!', 'Congratulations!');
      }
    );
  }

  public collapse() {
    this.isExpanded = false;
  }

  public toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onSaveShoppingList(): void {
    this.shoppingListService.saveShoppingListIngredients();
  }

  onFetchShoppingListIngredients(): void {
    this.shoppingListService.fetchShoppingListIngredients();
  }
}
