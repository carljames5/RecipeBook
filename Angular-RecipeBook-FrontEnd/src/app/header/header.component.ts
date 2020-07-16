import { Component, OnInit } from '@angular/core';
import { ShoppingListHttpService } from '../shopping-list/services/shopping-list-http.service';
import { ShoppingListService } from '../shopping-list/services/shopping-list.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
}
