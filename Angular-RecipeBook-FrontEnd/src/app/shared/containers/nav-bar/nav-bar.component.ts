import { Component } from '@angular/core';

import { ShoppingListService } from 'src/app/modules/shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isExpanded: boolean = false;

  constructor(private shoppingListService: ShoppingListService) {}

  public collapse(): void {
    this.isExpanded = false;
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public onFetchLastSavedShoppingList(): void {
    this.shoppingListService.getLastSavedShoppingList();
  }

  public onSaveShoppingList(): void {
    this.shoppingListService.saveShoppingList();
  }
}
