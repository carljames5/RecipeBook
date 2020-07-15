import { Component, OnInit } from '@angular/core';
import { ShoppingListHttpService } from '../shopping-list/services/shopping-list-http.service';
import { ShoppingListService } from '../shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onSaveShoppingList(): void {
    this.shoppingListService.saveShoppingListIngredients();
  }
}
